import { Point } from "../../drawer/Point"
import { Game } from "../Game"
import { Collider } from "./Collider"
import { Layer } from "./Layer"

export class PhysicsSystem {
    protected colliderLookup: Omit<Record<Layer, Collider[]>, "none"> = {
        enemy: [],
        player: [],
        projectile: [],
        wall: []
    }

    public update(deltaTime: number) {
        for (const collider of this.game.system.iterateComponents(Collider)) {
            collider.transform.move(collider.delta.mul(deltaTime))
        }
    }

    public registerCollider(collider: Collider, prevLayer?: Layer) {
        if (prevLayer && prevLayer != Layer.None) {
            const layer = this.colliderLookup[prevLayer]
            layer.splice(layer.indexOf(collider), 1)
        }
        if (collider.layer == Layer.None) return
        this.colliderLookup[collider.layer].push(collider)
    }

    public unregisterCollider(collider: Collider) {
        if (collider.layer == Layer.None) return
        const layer = this.colliderLookup[collider.layer]
        layer.splice(layer.indexOf(collider), 1)
    }

    public checkCircle(center: Point, radius: number, layer: Layer) {
        if (layer == Layer.None) return []
        const colliders = this.colliderLookup[layer]
        const radiusSqr = radius * radius
        const ret = []

        for (const collider of colliders) {
            if (collider.transform.pos.add(center).sizeSqr() < radiusSqr) {
                ret.push(collider)
            }
        }

        return ret
    }


    constructor(
        public readonly game: Game
    ) { }
}