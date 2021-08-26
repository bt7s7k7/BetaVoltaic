import { Component } from "../../entitySystem/Component"
import { PLAYER_BULLET_TIMEOUT } from "../constants"
import { Game } from "../Game"
import { BulletPrefab } from "../gameplay/BulletPrefab"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"

export class PlayerController extends DynamicComponent {
    public readonly input = this.system.findComponent(Game).input
    public readonly collider = Component.ref(Collider)
    public readonly transform = Component.ref(Transform)
    public speed = 10
    public bulletTimeout = 0

    public update(deltaTime: number) {
        this.collider.move(this.input.move.mul(this.speed))
        if (this.bulletTimeout > 0) this.bulletTimeout -= deltaTime

        if (this.input.fire && this.bulletTimeout <= 0) {
            const dir = this.input.mousePosWorld.add(this.transform.pos.mul(-1)).normalize()
            this.system.spawn(BulletPrefab(Layer.Enemy, this.transform.pos, dir))

            this.bulletTimeout = PLAYER_BULLET_TIMEOUT
        }
    }
}