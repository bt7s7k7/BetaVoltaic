import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { Transform } from "../Transform"

export class Collider extends Component {
    public radius = 1
    public readonly transform = Component.ref(Transform)

    public move(delta: Point) {
        this.transform.move(delta)
    }
}