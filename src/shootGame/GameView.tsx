import { defineComponent } from "vue"
import { defineDrawerInputConsumer } from "../drawerInput/DrawerInputConsumer"
import { DrawerView } from "../drawerInputVue3/DrawerView"
import { Game } from "./Game"

export const GameView = (defineComponent({
    name: "GameView",
    setup(props, ctx) {
        const consumer = defineDrawerInputConsumer((self, drawerInput) => {
            const game = new Game(drawerInput)
            self.guard(game)

            drawerInput.onDraw.add(self, ({ deltaTime }) => {
                game.update(drawerInput.drawer, deltaTime / 1000)
            })
        })

        return () => (
            <div class="flex-fill">
                <DrawerView class="absolute-fill" consumer={consumer} />
            </div>
        )
    }
}))