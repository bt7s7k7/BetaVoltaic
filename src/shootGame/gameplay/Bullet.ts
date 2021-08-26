import { Collider } from "../physics/Collider"
import { Layer } from "../physics/Layer"

export class Bullet extends Collider {
    public targetLayer = Layer.None

    public update() {
        const hits = this.testCollision(this.targetLayer)

        if (hits.length > 0) {
            this.entity.dispose()
        }
    }
}