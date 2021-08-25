import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { Game } from "../Game"
import { DrawableComponent } from "../rendering/DrawableComponent"
import { Transform } from "../Transform"

const PLAYER_COLOR = Color.yellow
const PLAYER_HOLE_SIZE = 0.75
const PLAYER_SHAPE = [
    Point.up,
    Point.fromAngle(PLAYER_HOLE_SIZE),
    Point.down.mul(0.4),
    Point.fromAngle(-PLAYER_HOLE_SIZE)
]

export class PlayerSprite extends DrawableComponent {
    public readonly game = this.system.findComponent(Game)
    public readonly transform = Component.ref(Transform)
    public angle = 0

    public drawSprite(drawer: Drawer, deltaTime: number) {
        const center = this.renderer.worldToScreen(this.transform.pos)

        if (deltaTime > 0) {
            this.angle = center.add(this.game.drawerInput.mouse.pos.mul(-1)).normalize().toAngle()
        }

        drawer
            .save()
            .setStyle(PLAYER_COLOR)
            .translate(center)
            .rotate(-this.angle)
            .beginPath()
            .shape(PLAYER_SHAPE.map(v => v.mul(this.renderer.zoom * 0.5)))
            .fill()
            /* .beginPath()
            .arc(Point.zero, this.renderer.zoom * 0.5)
            .stroke() */
            .restore()
    }
}