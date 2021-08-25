import { Prefab } from "../../entitySystem/Entity"
import { FracFollower } from "../player/FracFollower"
import { Transform } from "../Transform"
import { Camera } from "./Camera"

export const PlayerCameraPrefab: Prefab = builder => builder
    .addComponent(Transform)
    .addComponent(Camera)
    .addComponent(FracFollower)
    .build()