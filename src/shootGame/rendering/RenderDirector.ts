import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Transform } from "../Transform"
import { Camera } from "./Camera"
import { DrawableComponent } from "./DrawableComponent"

export class RenderDirector {
    public readonly pos = this.camera.entity.getComponent(Transform).pos
    public readonly zoom = this.camera.zoom
    public readonly center = this.drawer.size.center()

    public worldToScreen(point: Point) {
        return point.add(this.pos.mul(-1)).mul(this.zoom).add(this.center)
    }

    public screenToWorld(point: Point) {
        return point.add(this.center.mul(-1)).mul(1 / this.zoom).add(this.pos)
    }

    protected constructor(
        public readonly drawer: Drawer,
        public readonly deltaTime: number,
        public readonly camera: Camera
    ) {
        try {
            RenderDirector.current = this

            for (const sprite of this.camera.system.iterateComponents(DrawableComponent)) {
                sprite.drawSprite(drawer, deltaTime)
            }

        } finally {
            RenderDirector.current = null
        }
    }

    static current: null | RenderDirector = null

    public static render(drawer: Drawer, deltaTime: number, camera: Camera) {
        new RenderDirector(drawer, deltaTime, camera)
    }
}