import { Layer } from "../physics/Layer"
import { Bullet } from "./Bullet"
import { EffectType } from "./Effect"
import { Health } from "./Health"

export const ShieldEffect = new EffectType({
    label: "Shield",
    duration: 5,
    onStart: player => {
        player.entity.getComponent(Health).invulnerable = true
        player.entity.addComponent(Bullet, { targetLayer: Layer.Enemy, damage: Infinity, pierce: true })
    },
    onEnd: player => {
        player.entity.getComponent(Health).invulnerable = false
        player.entity.getComponent(Bullet).dispose()
    }
})