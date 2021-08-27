import { defineComponent, ref } from "vue"
import { GameView } from "./GameView"
import { MainMenu } from "./MainMenu"

type State = "menu" | "game"
export const Scene = (defineComponent({
    name: "Scene",
    setup(props, ctx) {
        const state = ref<State>("game")
        const key = ref(0)

        function setState(newState: State) {
            key.value++
            state.value = newState
        }

        return () => (
            state.value == "menu" ? <MainMenu key={key.value} onStart={() => setState("game")} />
                : <GameView onReset={() => setState("game")} key={key.value} />
        )
    }
}))