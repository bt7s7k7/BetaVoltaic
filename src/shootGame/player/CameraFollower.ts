import { Component } from "../../entitySystem/Component"
import { DynamicComponent } from "../physics/DynamicComponent"
import { Transform } from "../Transform"

export class CameraFollower extends DynamicComponent {
    public transform = Component.ref(Transform)
    public target!: Transform

    public update() {
        this.transform.pos = this.transform.pos.add(this.target.pos).mul(0.5)
    }
}