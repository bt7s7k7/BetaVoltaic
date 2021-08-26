import { Prefab } from "../../entitySystem/Entity"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { PlayerController } from "./PlayerController"
import { PlayerSprite } from "./PlayerSprite"

export const PlayerPrefab: Prefab = (builder) => builder
    .addComponent(Transform)
    .addComponent(PlayerSprite)
    .addComponent(PlayerController)
    .addComponent(Collider, v => v().set({ layer: Layer.Player }))
    .build()