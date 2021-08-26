import { PLAYER_IFRAME_TIMEOUT } from "../constants"
import { Game } from "../Game"
import { Timeout } from "../Timeout"
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
                    health.entity.dispose()
                }
            }
        }
    }

    constructor(
        public readonly game: Game
    ) { }
}