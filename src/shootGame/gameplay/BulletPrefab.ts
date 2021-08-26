import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { BULLET_SPEED } from "../constants"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { DrawableComponent } from "../rendering/DrawableComponent"
import { Transform } from "../Transform"
import { Bullet } from "./Bullet"

interface BulletOptions {
    targetLayer: Layer
    pos: Point
    dir: Point
    color: Drawer.Style
}

export const BulletPrefab = ({ targetLayer, pos, dir, color }: BulletOptions): Prefab => builder => builder
    .addComponent(Bullet, { targetLayer })
    .addComponent(Collider, {
        delta: dir.mul(BULLET_SPEED),
        deleteOnCollision: true,
        layer: Layer.Projectile,
        radius: 0.1
    })
    .addComponent(Transform, { pos })
    .addComponent(class extends DrawableComponent {
        public drawSprite(drawer: Drawer) {
            const center = this.renderer.worldToScreen(this.transform.pos)

            drawer.setStyle(color)
                .beginPath()
                .arc(center, 0.1 * this.renderer.zoom)
                .fill()
        }
    })
    .build()