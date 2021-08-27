import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { CHARGER_HEALTH, ENFORCER_HEALTH } from "../constants"
import { Health } from "../gameplay/Health"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { EnforcerController } from "./EnforcerController"
import { EnforcerSprite } from "./EnforcerSprite"

export const EnforcerPrefab = (pos: Point): Prefab => builder => builder
    .addComponent(Transform, { pos })
    .addComponent(Collider, { layer: Layer.Enemy, radius: 1 })
    .addComponent(EnforcerSprite)
    .addComponent(EnforcerController)
    .addComponent(Health, { maxHealth: ENFORCER_HEALTH })
    .build()