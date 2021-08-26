import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Rect } from "../../drawer/Rect"
import { Component } from "../../entitySystem/Component"
import { Transform } from "../Transform"
import { RenderDirector } from "./RenderDirector"

export class Camera extends Component {
    public readonly transform = Component.ref(Transform)

    protected lastSize = new Rect()
    protected lastCenter = Point.zero

    public zoom = 40

    public worldToScreen(point: Point) {
        return point.add(this.transform.pos.mul(-1)).mul(this.zoom).add(this.lastCenter)
    }

    public screenToWorld(point: Point) {
        return point.add(this.lastCenter.mul(-1)).mul(1 / this.zoom).add(this.transform.pos)
    }

    public draw(drawer: Drawer, deltaTime: number) {
        this.lastSize = drawer.size
        this.lastCenter = this.lastSize.center()
        RenderDirector.render(drawer, deltaTime, this)

    }

    public init() {
        super.init()
    }
}