import { css } from "@emotion/css"
import { defineComponent, ref } from "vue"
import { defineDrawerInputConsumer } from "../drawerInput/DrawerInputConsumer"
import { DrawerView } from "../drawerInputVue3/DrawerView"
import { Game } from "./Game"

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

export const GameView = (defineComponent({
    name: "GameView",
    setup(props, ctx) {
        const debugText = ref("")
        const time = ref(0)

        const consumer = defineDrawerInputConsumer((self, drawerInput) => {
            const game = new Game(drawerInput)
            self.guard(game)

            function update(deltaTime: number) {
                game.update(drawerInput.drawer, deltaTime / 1000)
                debugText.value = game.getDebugText()
                time.value = game.time
            }

            drawerInput.onDraw.add(self, ({ deltaTime }) => {
                update(deltaTime)
            })
        })

        return () => (
            <div class="flex-fill">
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
            </div>
        )
    }
}))