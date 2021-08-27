import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { Health } from "./Health"
import { HealthPickupSprite } from "./HealthPickupSprite"
import { PickupComponent } from "./PickupComponent"

export const HealthPickupPrefab = (pos: Point): Prefab => builder => builder
    .addComponent(Transform, { pos })
    .addComponent(Collider, { layer: Layer.Pickup })
    .addComponent(HealthPickupSprite)
    .addComponent(PickupComponent, { pickup: player => player.entity.getComponent(Health).health += 1 })
    .build()