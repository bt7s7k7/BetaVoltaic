import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { Transform } from "../Transform"
import { ExplosionSprite } from "./ExplosionSprite"

interface ExplosionOptions {
    pos: Point,
    radius: number,
    maxTime?: number,
    color?: Drawer.Style
    offset?: number
}

export const ExplosionPrefab = ({ pos, radius, color = Color.orange.lerp(Color.yellow, Math.random() / 2), maxTime = 0.2, offset = 0 }: ExplosionOptions): Prefab => builder => builder
    .addComponent(Transform, { pos })
    .addComponent(ExplosionSprite, { radius, color, maxTime, timer: -offset })
    .build()