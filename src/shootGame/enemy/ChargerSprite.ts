import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { DrawableComponent } from "../rendering/DrawableComponent"

const HEXAGON = new Path2D()
for (let i = 0; i < 6; i++) {
    const angle = (i / 3) * Math.PI
    const point = Point.fromAngle(angle).mul(0.5)
    if (i == 0) HEXAGON.moveTo(point.x, point.y)
    else HEXAGON.lineTo(point.x, point.y)
}

export class ChargerSprite extends DrawableComponent {
    public angle = 0
    public travelAngle: number | null = null

    public drawSprite(drawer: Drawer, deltaTime: number) {
        this.angle += deltaTime * 5

        drawer
            .save()
            .translate(this.renderer.worldToScreen(this.transform.pos))

        if (this.travelAngle != null) {
            drawer
                .rotate(-this.travelAngle)
                .scale(new Point(0.75, 1.25))
        }

        drawer
            .save()
            .translate(new Point(Math.random() * 2 - 1, Math.random() * 2 - 1).mul(this.renderer.zoom * 0.1))
            .scale(this.renderer.zoom * 1.05)
            .rotate(this.angle)
            .setStyle(Color.orange)
            .fill(HEXAGON)
            .restore()

            .save()
            .scale(this.renderer.zoom)
            .rotate(-this.angle)
            .setStyle(Color.red)
            .fill(HEXAGON)
            .restore()

            .restore()
    }
}