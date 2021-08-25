import { Prefab } from "../../entitySystem/Entity"
import { Transform } from "../Transform"
import { PlayerSprite } from "./PlayerSprite"

export const PlayerPrefab: Prefab = (builder) => builder
    .addComponent(Transform)
    .addComponent(PlayerSprite)
    .build()