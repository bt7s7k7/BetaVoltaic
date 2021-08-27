import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { Bullet } from "./Bullet"
import { BulletSprite } from "./BulletSprite"

interface BulletOptions {
    targetLayer: Layer
    pos: Point
    dir: Point
    color: Drawer.Style
    damage: number
    speed: number
}

export const BulletPrefab = ({ targetLayer, pos, dir, color, damage, speed }: BulletOptions): Prefab => builder => builder
    .addComponent(Bullet, { targetLayer, damage })
    .addComponent(Collider, {
        delta: dir.mul(speed),
        layer: Layer.Projectile,
        radius: 0.1
    })
    .addComponent(Transform, { pos })
    .addComponent(BulletSprite, { color, angle: dir.toAngle() })
    .build()