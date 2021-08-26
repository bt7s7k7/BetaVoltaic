import { Component } from "../../entitySystem/Component"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Layer } from "../physics/Layer"

export class Bullet extends DynamicComponent {
    public targetLayer = Layer.None
    public readonly collider = Component.ref(Collider)
    protected toDelete = false

    public update() {
        if (this.toDelete) this.entity.dispose()
        const hits = this.collider.testCollision(this.targetLayer)

        if (hits.length > 0) {
            this.toDelete = true
        }
    }
}
