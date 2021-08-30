import { Point } from "../../drawer/Point"
import { Game } from "../Game"
import { Camera } from "../rendering/Camera"

export class GameInput {
    public move = Point.zero
    public mousePos = Point.zero
    public mousePosWorld = Point.zero
    public fire = false
    public dir = Point.zero

    public update() {
        let mX = 0
        let mY = 0

        if (this.game.drawerInput.keyboard.key("KeyW").down) mY -= 1
        if (this.game.drawerInput.keyboard.key("KeyS").down) mY += 1
        if (this.game.drawerInput.keyboard.key("KeyA").down) mX -= 1
        if (this.game.drawerInput.keyboard.key("KeyD").down) mX += 1

        this.move = new Point(mX, mY).add(this.game.touchControls.move.value).clampSize(1)

        const camera = this.getCamera()
        const mousePos = this.game.drawerInput.mouse.pos
        if (!isNaN(mousePos.x)) {
            this.mousePos = mousePos
            this.mousePosWorld = camera.screenToWorld(this.mousePos)
        }

        if (!this.game.touchControls.fire.value.isZero()) {
            this.fire = true
            this.dir = this.game.touchControls.fire.value.normalize()
        } else {
            this.fire = this.game.drawerInput.mouse.left.down
            if (!this.mousePos.isZero()) this.dir = this.mousePosWorld.add(this.game.player.transform.pos.mul(-1)).normalize()
        }
    }

    protected getCamera() {
        return this.game.cameraEntity.getComponent(Camera)
    }

    constructor(
        protected readonly game: Game
    ) { }
}