import { defineComponent, ref } from "vue"
import { defineDrawerInputConsumer } from "../drawerInput/DrawerInputConsumer"
import { DrawerView } from "../drawerInputVue3/DrawerView"
import { Game } from "./Game"

export const GameView = (defineComponent({
    name: "GameView",
    setup(props, ctx) {
        const debugText = ref("")

        const consumer = defineDrawerInputConsumer((self, drawerInput) => {
            const game = new Game(drawerInput)
            self.guard(game)

            drawerInput.onDraw.add(self, ({ deltaTime }) => {
                game.update(drawerInput.drawer, deltaTime / 1000)
                debugText.value = game.getDebugText()
            })
        })

        return () => (
            <div class="flex-fill">
                <DrawerView class="absolute-fill" consumer={consumer} />
                <pre class="absolute-fill ignored p-2 m-0">{debugText.value}</pre>
            </div>
        )
    }
}))