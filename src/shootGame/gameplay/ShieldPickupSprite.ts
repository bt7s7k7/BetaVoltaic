import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { DrawableComponent } from "../rendering/DrawableComponent"

const SHAPE: Point[] = [
    [0, 40],
    [Math.PI / 3, 35],
    [Math.PI - Math.PI / 4, 50],
    [Math.PI, 40],
    [Math.PI + Math.PI / 4, 50],
    [- Math.PI / 3, 35]
].map(([angle, mag]) => Point.fromAngle(angle).mul(mag / 100))

export class ShieldPickupSprite extends DrawableComponent {
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