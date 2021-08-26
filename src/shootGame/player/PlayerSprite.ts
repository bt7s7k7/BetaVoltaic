import { Drawer } from "../../drawer/Drawer"
import { PLAYER_COLOR } from "../constants"
import { PointerSprite } from "../enemy/PointerSprite"

export class PlayerSprite extends PointerSprite {
    public color = PLAYER_COLOR

    public drawSprite(drawer: Drawer) {
        this.angle = this.transform.pos.add(this.game.input.mousePosWorld.mul(-1)).normalize().toAngle()
        super.drawSprite(drawer)
    }
}