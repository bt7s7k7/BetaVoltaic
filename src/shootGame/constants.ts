import { Color } from "../drawer/Color"
import { ChargerController } from "./enemy/ChargerController"
import { ChargerPrefab } from "./enemy/ChargerPrefab"
import { EnemySpawnOptions } from "./enemy/EnemySpawner"
import { EnforcerController } from "./enemy/EnforcerController"
import { EnforcerPrefab } from "./enemy/EnforcerPrefab"
import { RangerController } from "./enemy/RangerController"
import { RangerPrefab } from "./enemy/RangerPrefab"
import { Health } from "./gameplay/Health"
import { HealthPickupPrefab } from "./gameplay/HealthPickupPrefab"
import { HealthPickupSprite } from "./gameplay/HealthPickupSprite"
import { ShieldEffect } from "./gameplay/ShieldEffect"
import { ShieldPickupPrefab } from "./gameplay/ShieldPickupPrefab"
import { ShieldPickupSprite } from "./gameplay/ShieldPickupSprite"

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
export const CHARGER_HEALTH = 2
export const CHARGER_DAMAGE = 1
export const CHARGER_CHARGE_TIME = 0.5
export const CHARGER_TRAVEL_TIME = 0.5
export const CHARGER_TRAVEL_SPEED = 20
export const ENFORCER_HEALTH = 1
export const ENFORCER_BULLET_TIMEOUT = 0.4
export const ENFORCER_BULLET_SPEED = 10
export const ENFORCER_DAMAGE = 0.5
export const TOUCH_JOY_PADDING = 50
export const TOUCH_JOY_SIZE = 100
export const TOUCH_CENTER_JOY_SIZE = 200
export const TOUCH_JOY_LINE_WIDTH = 2
export const TOUCH_JOY_COLOR = Color.white
export const TOUCH_JOY_DOT_SIZE = 20

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
    },
    {
        prefab: EnforcerPrefab,
        maxCount: 1,
        minTime: 10,
        spawnChance: 0.5,
        trackComponent: EnforcerController
    },
    {
        prefab: HealthPickupPrefab,
        maxCount: 5,
        spawnChance: 0.5,
        trackComponent: HealthPickupSprite,
        minTime: 0,
        condition: game => {
            const health = game.playerEntity.getComponent(Health)
            return health.health < health.maxHealth
        }
    },
    {
        prefab: ShieldPickupPrefab,
        maxCount: 2,
        spawnChance: 0.5,
        minTime: 5,
        trackComponent: ShieldPickupSprite,
        condition: game => {
            return !game.player.effects.has(ShieldEffect)
        }
    }
]