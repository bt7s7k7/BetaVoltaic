import { Color } from "../drawer/Color"
import { ChargerController } from "./enemy/ChargerController"
import { ChargerPrefab } from "./enemy/ChargerPrefab"
import { EnemySpawnOptions } from "./enemy/EnemySpawner"
import { RangerController } from "./enemy/RangerController"
import { RangerPrefab } from "./enemy/RangerPrefab"

export const PLAYER_BULLET_SPEED = 40
export const PLAYER_BULLET_TIMEOUT = 0.1
export const PLAYER_COLOR = Color.yellow
export const PLAYER_SPEED = 10
export const PLAYER_HEALTH = 10
export const PLAYER_DAMAGE = 1
export const PLAYER_IFRAME_TIMEOUT = 0.1
export const ARENA_RADIUS = 30
export const ARENA_RADIUS_SQR = ARENA_RADIUS ** 2
export const TILE_SIZE = 1
export const TILE_BASE_COLOR = new Color(0.043, 0.086, 0.114)
export const RANGER_BULLET_TIMEOUT = 0.5
export const RANGER_ENGAGE_RADIUS_MIN = 10
export const RANGER_ENGAGE_RADIUS_MIN_SQR = RANGER_ENGAGE_RADIUS_MIN ** 2
export const RANGER_ENGAGE_RADIUS_MAX = 12
export const RANGER_ENGAGE_RADIUS_MAX_SQR = RANGER_ENGAGE_RADIUS_MAX ** 2
export const RANGER_SPEED = 5
export const RANGER_HEALTH = 5
export const RANGER_DAMAGE = 1
export const RANGER_BULLET_SPEED = 15
export const SPAWN_ATTEMPT_TIMEOUT = 0.5
export const CHARGER_HEALTH = 3
export const CHARGER_DAMAGE = 1
export const CHARGER_CHARGE_TIME = 0.5
export const CHARGER_TRAVEL_TIME = 0.5
export const CHARGER_TRAVEL_SPEED = 20

export const ENEMY_SPAWN_OPTIONS: EnemySpawnOptions[] = [
    {
        prefab: RangerPrefab,
        maxCount: 5,
        minTime: 5,
        spawnChance: 0.1,
        trackComponent: RangerController
    },
    {
        prefab: ChargerPrefab,
        maxCount: 10,
        minTime: 0,
        spawnChance: 0.2,
        trackComponent: ChargerController
    }
]