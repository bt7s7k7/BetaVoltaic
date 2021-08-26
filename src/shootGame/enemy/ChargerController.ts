import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { CHARGER_CHARGE_TIME, CHARGER_TRAVEL_SPEED, CHARGER_TRAVEL_TIME } from "../constants"
import { Game } from "../Game"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Timeout } from "../Timeout"
import { Transform } from "../Transform"
import { ChargerSprite } from "./ChargerSprite"

export class ChargerController extends DynamicComponent {
    public readonly game = this.system.findComponent(Game)
    public readonly transform = Component.ref(Transform)
    public readonly collider = Component.ref(Collider)
    public readonly sprite = Component.ref(ChargerSprite)
    public readonly chargeTimeout = new Timeout(CHARGER_CHARGE_TIME, true)
    public readonly travelTimeout = new Timeout(CHARGER_TRAVEL_TIME)
    public travelling = false

    public update(deltaTime: number) {
        this.chargeTimeout.update(deltaTime)
        this.travelTimeout.update(deltaTime)

        if (this.travelling) {
            if (this.travelTimeout.ready()) {
                this.collider.delta = Point.zero
                this.chargeTimeout.restart()
                this.travelling = false
                this.sprite.travelAngle = null
            } else return
        }

        if (this.chargeTimeout.ready()) {
            const player = this.game.playerEntity.getComponent(Transform)
            const diff = player.pos.add(this.transform.pos.mul(-1))
            const dir = diff.normalize()

            this.collider.delta = dir.mul(CHARGER_TRAVEL_SPEED)
            this.travelling = true
            this.travelTimeout.restart()
            this.sprite.travelAngle = dir.toAngle()
        }
    }
}