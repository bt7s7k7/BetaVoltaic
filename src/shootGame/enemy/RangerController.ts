import { Color } from "../../drawer/Color"
import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { RANGER_BULLET_SPEED, RANGER_BULLET_TIMEOUT, RANGER_DAMAGE, RANGER_ENGAGE_RADIUS_SQR, RANGER_SPEED } from "../constants"
import { Game } from "../Game"
import { BulletPrefab } from "../gameplay/BulletPrefab"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Layer } from "../physics/Layer"
import { Timeout } from "../Timeout"
import { Transform } from "../Transform"
import { PointerSprite } from "./PointerSprite"

export class RangerController extends DynamicComponent {
    public readonly game = this.system.findComponent(Game)
    public readonly sprite = Component.ref(PointerSprite)
    public readonly transform = Component.ref(Transform)
    public readonly collider = Component.ref(Collider)
    public readonly fireTimeout = new Timeout(RANGER_BULLET_TIMEOUT)
    public speed = RANGER_SPEED
    public chirality = Math.random() > 0.5 ? 1 : -1

    public update(deltaTime: number) {
        this.fireTimeout.update(deltaTime)
        const player = this.game.playerEntity.getComponent(Transform)
        const diff = player.pos.add(this.transform.pos.mul(-1))
        const dir = diff.normalize()

        this.sprite.angle = diff.mul(-1).toAngle()

        const velocity = (diff.sizeSqr() > RANGER_ENGAGE_RADIUS_SQR ? dir : dir.mul(-1))
            .add(new Point(dir.y, -dir.x).mul(this.chirality))
            .normalize()
            .mul(this.speed)

        this.collider.move(velocity)

        if (this.fireTimeout.ready()) {
            this.system.spawn(BulletPrefab({
                targetLayer: Layer.Player,
                pos: this.transform.pos, dir,
                color: Color.red,
                damage: RANGER_DAMAGE,
                speed: RANGER_BULLET_SPEED
            }))
            this.fireTimeout.restart()
        }

    }
}