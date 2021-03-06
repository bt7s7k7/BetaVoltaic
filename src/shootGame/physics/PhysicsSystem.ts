import { Point } from "../../drawer/Point"
import { ARENA_RADIUS, ARENA_RADIUS_SQR } from "../constants"
import { Game } from "../Game"
import { Collider } from "./Collider"
import { Layer } from "./Layer"

export class PhysicsSystem {
    protected colliderLookup: Omit<Record<Layer, Collider[]>, "none"> = {
        enemy: [],
        player: [],
        projectile: [],
        wall: [],
        pickup: []
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
        const ret = []

        center = center.mul(-1)

        for (const collider of colliders) {
            const maxDist = radius + collider.radius
            if (collider.transform.pos.add(center).sizeSqr() < maxDist * maxDist) {
                ret.push(collider)
            }
        }

        const toDelete = []

        for (const projectile of this.colliderLookup.projectile) {
            if (projectile.transform.pos.sizeSqr() > ARENA_RADIUS_SQR * 4) {
                toDelete.push(projectile)
            }
        }

        for (const player of this.colliderLookup.player) {
            if (player.transform.pos.sizeSqr() > ARENA_RADIUS_SQR) {
                const dist = player.transform.pos.size()
                const error = ARENA_RADIUS - dist
                player.transform.move(player.transform.pos.normalize().mul(error))
            }
        }

        for (const collider of toDelete) {
            collider.entity.dispose()
        }

        return ret
    }


    constructor(
        public readonly game: Game
    ) { }
}