import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { CHARGER_DAMAGE, CHARGER_HEALTH } from "../constants"
import { Bullet } from "../gameplay/Bullet"
import { Health } from "../gameplay/Health"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { ChargerController } from "./ChargerController"
import { ChargerSprite } from "./ChargerSprite"

export const ChargerPrefab = (pos: Point): Prefab => builder => builder
    .addComponent(Transform, { pos })
    .addComponent(Collider, { layer: Layer.Enemy })
    .addComponent(ChargerSprite)
    .addComponent(ChargerController)
    .addComponent(Health, { maxHealth: CHARGER_HEALTH })
    .addComponent(Bullet, { targetLayer: Layer.Player, damage: CHARGER_DAMAGE, pierce: true })
    .build()