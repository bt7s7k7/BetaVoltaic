import { Component } from "../../entitySystem/Component"
import { Transform } from "../Transform"

export class Health extends Component {
    public health = 0
    public maxHealth = 0
    public readonly transform = Component.ref(Transform)

    public hit(damage: number) {
        this.health -= damage
    }

    public init() {
        super.init()
        this.health = this.maxHealth
    }
}