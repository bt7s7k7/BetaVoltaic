import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { Game } from "../Game"
import { DrawableComponent } from "../rendering/DrawableComponent"
import { Transform } from "../Transform"

const HOLE_SIZE = 0.75
const SHAPE = [
    Point.up,
    Point.fromAngle(HOLE_SIZE),
    Point.down.mul(0.4),
    Point.fromAngle(-HOLE_SIZE)
]

export class PointerSprite extends DrawableComponent {
    public readonly game = this.system.findComponent(Game)
    public readonly transform = Component.ref(Transform)
    public color = Color.white
    public angle = 0

    public drawSprite(drawer: Drawer) {
        const center = this.renderer.worldToScreen(this.transform.pos)

        drawer
            .save()
            .setStyle(this.color)
            .translate(center)
            .rotate(-this.angle)
            .beginPath()
            .shape(SHAPE.map(v => v.mul(this.renderer.zoom * 0.5)))
            .fill()
            .restore()
    }
}