import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Rect } from "../../drawer/Rect"
import { DrawableComponent } from "../rendering/DrawableComponent"

const SQUARE_POINTS = [
    new Point(-1, -1).normalize(),
    new Point(1, -1).normalize(),
    new Point(1, 1).normalize(),
    new Point(-1, 1).normalize(),
]

const SHAPE: Point[] = []

for (let i = 0; i < 4; i++) {
    const curr = SQUARE_POINTS[i]
    const next = SQUARE_POINTS[(i + 1) % 4]

    const tangent = curr.add(next.mul(-1)).normalize()
    const normal = new Point(tangent.y, -tangent.x)

    SHAPE.push(curr)
    SHAPE.push(curr.lerp(next, 1 / 3))
    SHAPE.push(curr.lerp(next, 1 / 2).add(normal).normalize())
    SHAPE.push(curr.lerp(next, 2 / 3))
}

export class EnforcerSprite extends DrawableComponent {
    public angle = 0

    public drawSprite(drawer: Drawer, deltaTime: number) {
        this.angle += deltaTime

        const center = this.renderer.worldToScreen(this.transform.pos)

        drawer
            .save()
            .translate(center)
            .scale(this.renderer.zoom)
            .save()
            .rotate(-this.angle)
            .setStyle(Color.red.lerp(Color.black, 0.5))
            .fillRect(Rect.extends(Point.zero, Point.one.mul(1.4)))
            .rotate(Math.PI / 4)
            .fillRect(Rect.extends(Point.zero, Point.one.mul(1.4)))
            .restore()
            .rotate(this.angle)
            .setStyle(Color.red)
            .beginPath()
            .shape(SHAPE)
            .fill()
            .restore()
    }
}