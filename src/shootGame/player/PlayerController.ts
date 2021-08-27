import { Component } from "../../entitySystem/Component"
import { PLAYER_BULLET_SPEED, PLAYER_BULLET_TIMEOUT, PLAYER_COLOR, PLAYER_DAMAGE, PLAYER_SPEED } from "../constants"
import { Game } from "../Game"
import { BulletPrefab } from "../gameplay/BulletPrefab"
import { Effect, EffectType } from "../gameplay/Effect"
import { PickupComponent } from "../gameplay/PickupComponent"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Layer } from "../physics/Layer"
import { Timeout } from "../Timeout"
import { Transform } from "../Transform"

export class PlayerController extends DynamicComponent {
    public readonly input = this.system.findComponent(Game).input
    public readonly collider = Component.ref(Collider)
    public readonly transform = Component.ref(Transform)
    public speed = PLAYER_SPEED
    public bulletTimeout = new Timeout(PLAYER_BULLET_TIMEOUT)
    public effects = new Map<EffectType, Effect>()

    public update(deltaTime: number) {
        this.collider.move(this.input.move.mul(this.speed))
        this.bulletTimeout.update(deltaTime)

        if (this.input.fire && this.bulletTimeout.ready()) {
            const dir = this.input.mousePosWorld.add(this.transform.pos.mul(-1)).normalize()
            this.system.spawn(BulletPrefab({
                targetLayer: Layer.Enemy,
                pos: this.transform.pos, dir,
                color: PLAYER_COLOR,
                damage: PLAYER_DAMAGE,
                speed: PLAYER_BULLET_SPEED
            }))

            this.bulletTimeout.restart()
        }

        for (const pickup of this.collider.testCollision(Layer.Pickup)) {
            pickup.entity.getComponent(PickupComponent).pickup(this)
            pickup.entity.dispose()
        }

        for (const [type, effect] of this.effects) {
            effect.time -= deltaTime
            if (effect.time <= 0) {
                type.onEnd?.(this)
                this.effects.delete(type)
            }
        }
    }

    public addEffect(type: EffectType) {
        if (this.effects.has(type)) {
            type.onEnd?.(this)
            this.effects.delete(type)
        }

        type.onStart?.(this)
        this.effects.set(type, new Effect(type))
    }
}