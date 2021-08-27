import { css } from "@emotion/css"
import { defineComponent, ref, watch } from "vue"
import { defineDrawerInputConsumer } from "../drawerInput/DrawerInputConsumer"
import { DrawerView } from "../drawerInputVue3/DrawerView"
import { eventDecorator } from "../eventDecorator"
import { Button } from "../vue3gui/Button"
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
        reset: () => true
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
                debugText.value = game.getDebugText()
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

                {state.value == "paused" && <div class="absolute-fill ignored flex center p-2 bg-black-transparent">
                    <h1 class="monospace p-2">Paused</h1>
                </div>}

                {state.value == "dead" && <div class="absolute-fill flex column center p-2 bg-black-transparent gap-2">
                    <h1 class="monospace m-0">Neutralized</h1>
                    <h2 class="monospace m-0">You survived {time.value.toFixed(2)} seconds</h2>
                    <h2 class="monospace m-0">High score: {Settings.value.highScore} seconds</h2>
                    <Button onClick={() => ctx.emit("reset")}>Try again</Button>
                </div>}
            </div>
        )
    }
}))