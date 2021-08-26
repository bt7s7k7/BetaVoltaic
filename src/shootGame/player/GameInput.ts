import { Point } from "../../drawer/Point"
import { Game } from "../Game"
import { Camera } from "../rendering/Camera"

export class GameInput {
    public move = Point.zero
    public mousePos = Point.zero
    public mousePosWorld = Point.zero
    public fire = false

    public update() {
        let mX = 0
        let mY = 0

        if (this.game.drawerInput.keyboard.key("KeyW").down) mY -= 1
        if (this.game.drawerInput.keyboard.key("KeyS").down) mY += 1
        if (this.game.drawerInput.keyboard.key("KeyA").down) mX -= 1
        if (this.game.drawerInput.keyboard.key("KeyD").down) mX += 1

        this.move = new Point(mX, mY).normalize()

        const camera = this.getCamera()
        const mousePos = this.game.drawerInput.mouse.pos
        if (!isNaN(mousePos.x)) {
            this.mousePos = mousePos
            this.mousePosWorld = camera.screenToWorld(this.mousePos)
        }
        this.fire = this.game.drawerInput.mouse.left.down
    }

    protected getCamera() {
        return this.game.cameraEntity.getComponent(Camera)
    }

    constructor(
        protected readonly game: Game
    ) { }
}