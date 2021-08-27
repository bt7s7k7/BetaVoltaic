import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { DrawableComponent } from "../rendering/DrawableComponent"

export class ExplosionSprite extends DrawableComponent {
    public timer = 0
    public maxTime = 0
    public radius = 0
    public color: Drawer.Style = Color.yellow

    public drawSprite(drawer: Drawer, deltaTime: number) {
        this.timer += deltaTime
        if (this.timer > this.maxTime) {
            this.entity.dispose()
            return
        }

        if (this.timer < 0) return

        const center = this.renderer.worldToScreen(this.transform.pos)

        const time = 1 - (1 - this.timer / this.maxTime) ** 2
        let radius = time * this.radius * this.renderer.zoom
        let width = time > 0 ? (1 - time) * this.renderer.zoom * 0.5 : 0

        drawer
            .save()
            .translate(center)
            .setStyle(this.color)
            .beginPath()
            .arc(Point.zero, radius)
            .arc(Point.zero, radius + width, 0, Math.PI * 2, true)
            .fill()
            .restore()
    }
}