import { css } from "@emotion/css"
import { defineComponent, ref, watch } from "vue"
import { defineDrawerInputConsumer } from "../drawerInput/DrawerInputConsumer"
import { DrawerView } from "../drawerInputVue3/DrawerView"
import { eventDecorator } from "../eventDecorator"
import { Button } from "../vue3gui/Button"
import { Aberration } from "./Aberration"
import { Game } from "./Game"
import { Settings } from "./Settings"

const TIMER_STYLE = {
    layout: css({
        color: "#000000"
    }),
    colors: [
        css({
            color: "#ff0000",
            mixBlendMode: "lighten",
            transform: "translate(-1px, -1px)"
        }),
        css({
            color: "#00ff00",
            mixBlendMode: "lighten",
            transform: "translate(0, 0)"
        }),
        css({
            color: "#0000ff",
            mixBlendMode: "lighten",
            transform: "translate(1px, 1px)"
        }),
    ]
}

export const GameView = eventDecorator(defineComponent({
    name: "GameView",
    emits: {
        reset: () => true,
        exit: () => true
    },
    setup(props, ctx) {
        const debugText = ref("")
        const time = ref(0)
        const state = ref<"normal" | "paused" | "dead">()

        const consumer = defineDrawerInputConsumer((self, drawerInput) => {
            const game = new Game(drawerInput)
            self.guard(game)

            function update(deltaTime: number) {
                if (!game.paused) game.update(drawerInput.drawer, deltaTime / 1000)
                if (Settings.value.fpsMeter) debugText.value = game.getDebugText()
                time.value = game.time

                state.value = !game.paused ? "normal"
                    : game.dead ? "dead"
                        : "paused"
            }

            drawerInput.onDraw.add(self, ({ deltaTime }) => {
                update(deltaTime)

            })

            drawerInput.onResize.add(self, () => {
                if (game.paused) game.update(drawerInput.drawer, 0)
            })
        })

        watch(state, (state, oldState) => {
            if (state == "dead" && oldState != "dead") {
                const score = time.value.toFixed(2)
                if (+Settings.value.highScore < +score) Settings.value.highScore = score
            }
        })

        return () => (
            <div class="flex-fill user-select-none">
                <DrawerView class="absolute-fill" consumer={consumer} />
                <pre class="absolute-fill ignored p-2 m-0">{debugText.value}</pre>
                <div class="absolute-fill ignored flex column center-cross p-2">
                    <h2 class="monospace">
                        <div class={TIMER_STYLE.layout}>
                            Time: {time.value.toFixed(2)}
                        </div>
                        {TIMER_STYLE.colors.map(className => (
                            <div key={className} class={["absolute-fill", className]}>
                                Time: {time.value.toFixed(2)}
                            </div>
                        ))}
                    </h2>
                </div>

                {state.value == "paused" && <div class="absolute-fill flex column center p-2 bg-black-transparent">
                    <h1 class="title monospace p-2">
                        <Aberration>Paused</Aberration>
                    </h1>
                    <Button onClick={() => ctx.emit("exit")}>
                        <Aberration>Main menu</Aberration>
                    </Button>
                </div>}

                {state.value == "dead" && <div class="absolute-fill flex column center p-2 bg-black-transparent gap-4">
                    <Aberration large class="monospace title m-0 mb-4">Neutralized</Aberration>
                    <div class="flex row gap-4">
                        <Button onClick={() => ctx.emit("reset")} variant="primary">
                            <Aberration>Try again</Aberration>
                        </Button>
                        <Button onClick={() => ctx.emit("exit")}>
                            <Aberration>Main menu</Aberration>
                        </Button>
                    </div>
                    <Aberration class="monospace m-0 mt-4">You survived {time.value.toFixed(2)} seconds</Aberration>
                    <Aberration class="monospace m-0">High score: {Settings.value.highScore} seconds</Aberration>
                </div>}
            </div>
        )
    }
}))