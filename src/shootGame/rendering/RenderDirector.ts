import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Rect } from "../../drawer/Rect"
import { Health } from "../gameplay/Health"
import { Transform } from "../Transform"
import { Camera } from "./Camera"
import { DrawableComponent } from "./DrawableComponent"
import { FloorRenderer } from "./FloorRenderer"

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

    protected drawFloor() {
        FloorRenderer.drawFloor(this.camera, this.drawer)
    }

    protected drawSprites() {
        for (const sprite of this.camera.system.iterateComponents(DrawableComponent)) {
            sprite.drawSprite(this.drawer, this.deltaTime)
        }
    }

    protected drawHealthBars() {
        this.drawer.setStyle(Color.green)

        for (const health of this.camera.system.iterateComponents(Health)) {
            const pos = this.worldToScreen(health.transform.pos)
            const center = pos.add(0, this.zoom * 1.1)
            const rect = Rect.extends(center, new Point(75, 10))

            const healthFrac = Math.max(Math.min(health.health / health.maxHealth, 1), 0)

            this.drawer.strokeRect(rect).fillRect(rect.scale(new Rect(1, 1, healthFrac, 1)))
        }
    }

    protected constructor(
        public readonly drawer: Drawer,
        public readonly deltaTime: number,
        public readonly camera: Camera
    ) {
        try {
            RenderDirector.current = this

            this.drawFloor()
            this.drawSprites()
            this.drawHealthBars()

        } finally {
            RenderDirector.current = null
        }
    }

    static current: null | RenderDirector = null

    public static render(drawer: Drawer, deltaTime: number, camera: Camera) {
        new RenderDirector(drawer, deltaTime, camera)
    }
}