import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { BULLET_SPEED } from "../constants"
import { Layer } from "../physics/Layer"
import { DrawableComponent } from "../rendering/DrawableComponent"
import { Transform } from "../Transform"
import { Bullet } from "./Bullet"

export const BulletPrefab = (targetLayer: Layer, pos: Point, dir: Point): Prefab => builder => builder
    .addComponent(Bullet, v => v().set({ targetLayer, delta: dir.mul(BULLET_SPEED) }))
    .addComponent(Transform, v => v().set({ pos }))
    .addComponent(class extends DrawableComponent {
        public drawSprite(drawer: Drawer) {
            const center = this.renderer.worldToScreen(this.transform.pos)

            drawer.setStyle(Color.yellow)
                .beginPath()
                .arc(center, 0.1 * this.renderer.zoom)
                .fill()
        }
    })
    .build()