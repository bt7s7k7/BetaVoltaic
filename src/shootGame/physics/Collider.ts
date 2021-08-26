import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { DISPOSE } from "../../eventLib/Disposable"
import { Game } from "../Game"
import { Transform } from "../Transform"
import { Layer } from "./Layer"

export class Collider extends Component {
    public radius = 1
    public layer = Layer.None
    public delta = Point.zero
    public deleteOnCollision = false
    public readonly transform = Component.ref(Transform)
    public readonly game = this.system.findComponent(Game)

    public [DISPOSE]() {
        this.game.physics.unregisterCollider(this)
        super[DISPOSE]()
    }

    public move(delta: Point) {
        this.delta = delta
    }

    public init() {
        super.init()
        this.game.physics.registerCollider(this)
    }

    public testCollision(layer: Layer) {
        return this.game.physics.checkCircle(this.transform.pos, this.radius, layer)
    }
}