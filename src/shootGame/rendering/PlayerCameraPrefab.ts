import { Prefab } from "../../entitySystem/Entity"
import { CameraFollower } from "../player/CameraFollower"
import { Transform } from "../Transform"
import { Camera } from "./Camera"

export const PlayerCameraPrefab: Prefab = builder => builder
    .addComponent(Transform)
    .addComponent(Camera)
    .addComponent(CameraFollower)
    .build()