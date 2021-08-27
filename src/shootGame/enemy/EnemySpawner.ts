import { Point } from "../../drawer/Point"
import { Prefab } from "../../entitySystem/Entity"
import { ComponentConstructor } from "../../entitySystem/util"
import { ARENA_RADIUS, ENEMY_SPAWN_OPTIONS, SPAWN_ATTEMPT_TIMEOUT } from "../constants"
import { Game } from "../Game"
import { Camera } from "../rendering/Camera"
import { Timeout } from "../Timeout"

export interface EnemySpawnOptions {
    prefab: (pos: Point) => Prefab
    minTime: number
    spawnChance: number
    maxCount: number
    trackComponent: ComponentConstructor
    condition?: (game: Game) => boolean
}

function getRandomPointInArena() {
    const x = (Math.random() - 0.5) * ARENA_RADIUS
    const y = (Math.random() - 0.5) * ARENA_RADIUS

    return new Point(x, y)
}

export class EnemySpawner {
    public spawnTimeout = new Timeout(SPAWN_ATTEMPT_TIMEOUT)
    public spawnOptions = ENEMY_SPAWN_OPTIONS

    public update(deltaTime: number) {
        this.spawnTimeout.update(deltaTime)
        if (this.spawnTimeout.ready()) {
            const camera = this.game.cameraEntity.getComponent(Camera)
            for (const spawnOption of this.spawnOptions) {
                if (this.game.time < spawnOption.minTime) continue

                if (Math.random() >= (spawnOption.spawnChance + this.game.time / 100)) continue

                if (this.game.system.countComponents(spawnOption.trackComponent) >= spawnOption.maxCount) continue

                if (spawnOption.condition && !spawnOption.condition(this.game)) continue

                let position: Point

                do {
                    position = getRandomPointInArena()
                } while (camera.isVisible(position))

                this.game.system.spawn(spawnOption.prefab(position))
            }

            this.spawnTimeout.restart()
        }
    }

    constructor(
        public readonly game: Game
    ) { }
}