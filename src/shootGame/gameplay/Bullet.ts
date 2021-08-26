import { Component } from "../../entitySystem/Component"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Layer } from "../physics/Layer"
import { Transform } from "../Transform"
import { Health } from "./Health"

export class Bullet extends DynamicComponent {
    public targetLayer = Layer.None
    public damage = 0
    public pierce = false
    public readonly collider = Component.ref(Collider)
    public readonly transform = Component.ref(Transform)
    protected toDelete = false

    public update() {
        if (this.toDelete) this.entity.dispose()
        const hits = this.collider.testCollision(this.targetLayer)

        if (hits.length > 0) {
            for (const hit of hits) {
                const health = hit.entity.tryGetComponent(Health)
                health?.hit(this.damage)
            }
            if (!this.pierce) this.toDelete = true
        }
    }
}
