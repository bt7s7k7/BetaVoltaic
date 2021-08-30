import { Point } from "../drawer/Point"
import { RectAlignOptions } from "../drawer/Rect"
import { DrawerInput } from "../drawerInput/DrawerInput"
import { AUTO_DISPOSE, Disposable } from "../eventLib/Disposable"
import { EventListener } from "../eventLib/EventListener"
import { TOUCH_JOY_COLOR, TOUCH_JOY_DOT_SIZE, TOUCH_JOY_LINE_WIDTH, TOUCH_JOY_PADDING, TOUCH_JOY_SIZE } from "./constants"
import { Game } from "./Game"
import { Settings } from "./Settings"

const processedLookup = new WeakSet<DrawerInput.TouchInstance>()

export class TouchControls extends Disposable {
    public [AUTO_DISPOSE] = true
    public move = new TouchJoy(this.game, { size: TOUCH_JOY_SIZE, left: TOUCH_JOY_PADDING, bottom: TOUCH_JOY_PADDING })
    public fire = new TouchJoy(this.game,
        Settings.value.fireCenter ? { padding: 0 }
            : { size: TOUCH_JOY_SIZE, right: TOUCH_JOY_PADDING, bottom: TOUCH_JOY_PADDING }
    )

    public draw() {
        this.move.draw()
        !Settings.value.fireCenter && this.fire.draw()
    }

    constructor(
        public readonly game: Game
    ) { super() }
}

class TouchJoy extends EventListener {
    public [AUTO_DISPOSE] = true
    protected touch: number | null = null
    protected lastOffset = Point.zero
    public value = Point.zero

    protected get drawerInput() {
        return this.game.drawerInput
    }

    protected get drawer() {
        return this.drawerInput.drawer
    }

    protected getRect() {
        return this.drawer.size.align(this.align)

    }

    protected update(pos: Point) {
        const rect = this.getRect()
        const center = rect.center()
        const radius = rect.width / 2

        const offset = pos.add(center.mul(-1)).clampSize(radius)

        this.lastOffset = offset
        this.value = offset.normalize()
    }

    public draw() {
        const rect = this.getRect()
        const center = rect.center()

        this.drawer
            .save()
            .setStyle(TOUCH_JOY_COLOR)
            .setStrokeWidth(TOUCH_JOY_LINE_WIDTH)

            .beginPath()
            .arc(center, rect.width / 2)
            .stroke()

            .beginPath()
            .arc(center.add(this.lastOffset), TOUCH_JOY_DOT_SIZE / 2)
            .fill()
            .restore()
    }

    constructor(
        protected readonly game: Game,
        protected readonly align: RectAlignOptions,
    ) {
        super()

        this.drawerInput.touch.onStart.add(this, ({ pos, instance }) => {
            if (this.touch != null) return
            if (processedLookup.has(instance)) return

            const rect = this.getRect()
            const center = rect.center()
            const radius = rect.width / 2
            const radiusSqr = radius * radius

            if (pos.add(center.mul(-1)).sizeSqr() < radiusSqr) {
                processedLookup.add(instance)

                this.touch = instance.identifier

                instance.onMove.add(this, ({ pos }) => {
                    this.update(pos)
                })

                this.update(pos)

                instance.onEnd.add(this, () => {
                    this.touch = null
                    this.lastOffset = Point.zero
                    this.value = Point.zero
                })
            }
        })
    }
}