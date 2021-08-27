import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { PickupComponent } from "./PickupComponent"
import { ShieldEffect } from "./ShieldEffect"
import { ShieldPickupSprite } from "./ShieldPickupSprite"

export const ShieldPickupPrefab = (pos: Point): Prefab => builder => builder
    .addComponent(Transform, { pos })
    .addComponent(Collider, { layer: Layer.Pickup })
    .addComponent(ShieldPickupSprite)
    .addComponent(PickupComponent, { pickup: player => player.addEffect(ShieldEffect) })
    .build()