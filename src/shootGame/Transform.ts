import { Point } from "../drawer/Point"
import { Component } from "../entitySystem/Component"

export class Transform extends Component {
    public pos = Point.zero

    public move(delta: Point) {
        this.pos = this.pos.add(delta)
    }
}