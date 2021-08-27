import { Color } from "../../drawer/Color"
import { Point } from "../../drawer/Point"
import { PLAYER_IFRAME_TIMEOUT } from "../constants"
import { Game } from "../Game"
import { Timeout } from "../Timeout"
import { ExplosionPrefab } from "./ExplosionPrefab"
import { Health } from "./Health"

export class HealthSystem {
    public readonly iframeTimeout = new Timeout(PLAYER_IFRAME_TIMEOUT)

    public update(deltaTime: number) {
        this.iframeTimeout.update(deltaTime)

        for (const health of this.game.system.iterateComponents(Health)) {
            const isPlayer = health.isPlayer

            if (isPlayer) {
                if (health.damage) {
                    if (this.iframeTimeout.ready()) {
                        health.health -= health.damage
                        this.iframeTimeout.restart()
                    }

                    health.damage = 0
                }
            }

            if (health.health <= 0) {
                if (isPlayer) {
                    this.game.onDeath.emit()
                } else {
                    let first = true
                    do {
                        this.game.system.spawn(ExplosionPrefab({
                            pos: first ? health.transform.pos : health.transform.pos.add(new Point(Math.random() - 0.5, Math.random() - 0.5).mul(2)),
                            radius: 1.5 + Math.random() * 1,
                            color: Color.orange.lerp(Color.yellow, Math.random() / 2),
                            offset: first ? 0 : Math.random() * 0.2
                        }))

                        first = false
                    } while (Math.random() < 0.5)
                    health.entity.dispose()
                }
            }
        }
    }

    constructor(
        public readonly game: Game
    ) { }
}