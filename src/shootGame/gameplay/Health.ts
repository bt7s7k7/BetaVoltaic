import { Component } from "../../entitySystem/Component"
import { Transform } from "../Transform"

export class Health extends Component {
    public health = 0
    public maxHealth = 0
    public damage = 0
    public isPlayer = false
    public readonly transform = Component.ref(Transform)

    public hit(damage: number) {
        if (this.isPlayer) {
            this.damage += damage
        } else {
            this.health -= damage
        }
    }

    public init() {
        super.init()
        this.health = this.maxHealth
    }
}