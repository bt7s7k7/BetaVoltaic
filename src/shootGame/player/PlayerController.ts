import { Component } from "../../entitySystem/Component"
import { Game } from "../Game"
import { Collider } from "../physics/Collider"
import { DynamicComponent } from "../physics/DynamicComponent"

export class PlayerController extends DynamicComponent {
    public readonly input = this.system.findComponent(Game).input
    public readonly collider = Component.ref(Collider)
    public speed = 10

    public update(deltaTime: number) {
        this.collider.move(this.input.move.mul(this.speed * deltaTime))
    }
}