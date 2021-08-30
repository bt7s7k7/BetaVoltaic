import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Component } from "../../entitySystem/Component"
import { PLAYER_COLOR } from "../constants"
import { PointerSprite } from "../enemy/PointerSprite"
import { ShieldEffect } from "../gameplay/ShieldEffect"
import { PlayerController } from "./PlayerController"

export class PlayerSprite extends PointerSprite {
    public color = PLAYER_COLOR
    public readonly player = Component.ref(PlayerController)

    public drawSprite(drawer: Drawer) {
        const center = this.renderer.worldToScreen(this.transform.pos)

        if (this.player.effects.has(ShieldEffect)) {
            drawer.save()

            drawer.ctx.globalCompositeOperation = "lighter"
            for (let i = 0; i < 4; i++) {
                drawer.setStyle(Color.green)
                drawer
                    .beginPath()
                    .arc(center.add(new Point(Math.random() - 0.5, Math.random() - 0.5).mul(this.renderer.zoom * 0.2)), this.renderer.zoom * 0.75)
                    .stroke()

                drawer.setStyle(Color.blue)
                drawer
                    .beginPath()
                    .arc(center.add(new Point(Math.random() - 0.5, Math.random() - 0.5).mul(this.renderer.zoom * 0.2)), this.renderer.zoom * 0.75)
                    .stroke()
            }

            drawer.restore()
        }

        this.angle = this.player.input.dir.toAngle() + Math.PI
        super.drawSprite(drawer)
    }
}