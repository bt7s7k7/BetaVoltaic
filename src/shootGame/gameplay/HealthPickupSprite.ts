import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { DrawableComponent } from "../rendering/DrawableComponent"

const WIDTH = 0.15
const SHAPE = [
    new Point(-WIDTH, -0.5),
    new Point(WIDTH, -0.5),
    new Point(WIDTH, -WIDTH),
    new Point(0.5, -WIDTH),
    new Point(0.5, WIDTH),
    new Point(WIDTH, WIDTH),
    new Point(WIDTH, 0.5),
    new Point(-WIDTH, 0.5),
    new Point(-WIDTH, WIDTH),
    new Point(-0.5, WIDTH),
    new Point(-0.5, -WIDTH),
    new Point(-WIDTH, -WIDTH),
]

export class HealthPickupSprite extends DrawableComponent {
    public drawSprite(drawer: Drawer) {

        const center = this.renderer.worldToScreen(this.transform.pos)

        drawer
            .save()
            .setStyle(Color.green)
            .translate(center)
            .scale(this.renderer.zoom)
            .beginPath()
            .shape(SHAPE)
            .fill()
            .restore()
    }
}