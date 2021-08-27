import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Rect } from "../../drawer/Rect"
import { Game } from "../Game"
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

    protected drawPlayerEffects() {
        const player = this.game.player
        const pos = player.transform.pos
        const effects = player.effects

        this.drawer
            .save()
            .translate(this.worldToScreen(pos).add(this.zoom, -this.zoom * 0.75))
            .setStyle(Color.yellow)

        for (const [type, { time }] of effects) {
            this.drawer.fillText(type.label, Point.zero, {
                align: "left",
                baseline: "top",
                size: 14
            })

            const durationBase = new Rect(0, 20, 40, 1)
            const durationHas = durationBase.scale(new Rect(1, 1, time / type.duration, 5)).translate(0, -2)

            this.drawer.fillRect(durationBase)
            this.drawer.fillRect(durationHas)

            this.drawer.translate(new Point(0, 28))
        }

        this.drawer.restore()
    }

    protected doPostProcessing() {
        for (const postProcess of this.game.postProcesses) {
            postProcess.render(this.drawer)
        }
    }


    protected constructor(
        public readonly drawer: Drawer,
        public readonly deltaTime: number,
        public readonly camera: Camera,
        public readonly game: Game
    ) {
        try {
            RenderDirector.current = this

            this.drawFloor()
            this.drawSprites()
            this.doPostProcessing()
            this.drawHealthBars()
            this.drawPlayerEffects()

        } finally {
            RenderDirector.current = null
        }
    }

    static current: null | RenderDirector = null

    public static render(drawer: Drawer, deltaTime: number, camera: Camera, game: Game) {
        new RenderDirector(drawer, deltaTime, camera, game)
    }
}