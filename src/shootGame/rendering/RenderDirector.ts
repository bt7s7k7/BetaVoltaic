import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Rect } from "../../drawer/Rect"
import { ARENA_RADIUS, ARENA_RADIUS_SQR, TILE_BASE_COLOR, TILE_SIZE } from "../constants"
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

            drawer.save()

            drawer
                .beginPath()
                .arc(this.worldToScreen(Point.zero), (ARENA_RADIUS - 1) * this.zoom)
                .clip()

            const screenTileSize = TILE_SIZE * this.zoom

            const oX = -((this.pos.x + 10000) % TILE_SIZE) * this.zoom
            const oY = -((this.pos.y + 10000) % TILE_SIZE) * this.zoom

            const bX = Math.floor(this.pos.x / TILE_SIZE) - this.center.x / this.zoom
            const bY = Math.floor(this.pos.y / TILE_SIZE) - this.center.y / this.zoom

            const sX = Math.floor(this.drawer.size.width / this.zoom / TILE_SIZE) + 1
            const sY = Math.floor(this.drawer.size.height / this.zoom / TILE_SIZE) + 2
            for (let x = -1; x < sX; x++)
                for (let y = -1; y < sY; y++) {
                    const screenX = x * screenTileSize + oX
                    const screenY = y * screenTileSize + oY
                    const realX = x + bX
                    const realY = y + bY

                    if (realX * realX + realY * realY > ARENA_RADIUS_SQR) continue

                    const value = parseFloat("0." + Math.sin(realX + realY * 50).toString().substr(6))


                    drawer
                        .setFillStyle(TILE_BASE_COLOR.mul(0.5 + value * 0.5))
                        .fillRect(new Rect(screenX, screenY, screenTileSize, screenTileSize))
                }
            drawer.restore()

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