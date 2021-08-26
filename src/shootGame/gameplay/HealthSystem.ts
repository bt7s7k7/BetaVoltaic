import { Game } from "../Game"
import { PlayerController } from "../player/PlayerController"
import { Health } from "./Health"

export class HealthSystem {
    public update() {
        for (const health of this.game.system.iterateComponents(Health)) {
            if (health.health <= 0) {
                if (health.entity.tryGetComponent(PlayerController)) {
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