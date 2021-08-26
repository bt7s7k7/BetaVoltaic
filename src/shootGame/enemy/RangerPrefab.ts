import { Color } from "../../drawer/Color"
import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { RANGER_HEALTH } from "../constants"
import { Health } from "../gameplay/Health"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { PointerSprite } from "./PointerSprite"
import { RangerController } from "./RangerController"

export const RangerPrefab = (pos: Point): Prefab => builder => builder
    .addComponent(Transform, { pos })
    .addComponent(Collider, { layer: Layer.Enemy })
    .addComponent(PointerSprite, { color: Color.red })
    .addComponent(RangerController)
    .addComponent(Health, { maxHealth: RANGER_HEALTH })
    .build()