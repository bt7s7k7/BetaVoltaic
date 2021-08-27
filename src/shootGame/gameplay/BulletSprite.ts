import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { DrawableComponent } from "../rendering/DrawableComponent"
import { Bullet } from "./Bullet"

const HIT_COLOR = Color.orange.lerp(Color.yellow, 0.5)

export class BulletSprite extends DrawableComponent {
    public angle = 0
    public color: Drawer.Style = Color.white
    public readonly bullet = Component.ref(Bullet)

    public drawSprite(drawer: Drawer) {
        const center = this.renderer.worldToScreen(this.transform.pos)

        drawer
            .save()
            .translate(center)
            .rotate(-this.angle)
            .scale(new Point(0.75, 1.25))

            .setStyle(this.color)
            .beginPath()
            .arc(Point.zero, 0.1 * this.renderer.zoom)
            .fill()

            .restore()
    }
}