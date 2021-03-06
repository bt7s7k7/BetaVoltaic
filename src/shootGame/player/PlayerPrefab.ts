import { Prefab } from "../../entitySystem/Entity"
import { PLAYER_HEALTH } from "../constants"
import { Health } from "../gameplay/Health"
import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { PlayerController } from "./PlayerController"
import { PlayerSprite } from "./PlayerSprite"

export const PlayerPrefab: Prefab = (builder) => builder
    .addComponent(Transform)
    .addComponent(PlayerSprite)
    .addComponent(PlayerController)
    .addComponent(Collider, { layer: Layer.Player })
    .addComponent(Health, { maxHealth: PLAYER_HEALTH, isPlayer: true })
    .build()