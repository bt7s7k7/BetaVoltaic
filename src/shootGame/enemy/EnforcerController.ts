import { Color } from "../../drawer/Color"
import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { ENFORCER_BULLET_SPEED, ENFORCER_BULLET_TIMEOUT, ENFORCER_DAMAGE } from "../constants"
import { BulletPrefab } from "../gameplay/BulletPrefab"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Layer } from "../physics/Layer"
import { Timeout } from "../Timeout"
import { Transform } from "../Transform"
import { EnforcerSprite } from "./EnforcerSprite"

export class EnforcerController extends DynamicComponent {
    public readonly transform = Component.ref(Transform)
    public readonly fireTimeout = new Timeout(ENFORCER_BULLET_TIMEOUT, true)
    public readonly sprite = Component.ref(EnforcerSprite)

    public update(deltaTime: number) {
        this.fireTimeout.update(deltaTime)

        const fireDirs = [
            0,
            Math.PI / 2,
            Math.PI,
            Math.PI * 3 / 2
        ].map(v => Point.fromAngle(-this.sprite.angle + v))

        if (this.fireTimeout.ready()) {
            for (const dir of fireDirs) {
                this.system.spawn(BulletPrefab({
                    pos: this.transform.pos.add(dir.mul(0.5)), dir,
                    color: Color.red,
                    damage: ENFORCER_DAMAGE,
                    speed: ENFORCER_BULLET_SPEED,
                    targetLayer: Layer.Player
                }))
            }

            this.fireTimeout.restart()
        }

    }
}