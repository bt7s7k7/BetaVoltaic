import { defineComponent, ref, Transition } from "vue"
import { GameView } from "./GameView"
import { MainMenu } from "./MainMenu"
import { SettingsView } from "./SettingsView"
import "./style.scss"

type State = "menu" | "game" | "settings"
export const Scene = (defineComponent({
    name: "Scene",
    setup(props, ctx) {
        const state = ref<State>("menu")
        const key = ref(0)

        function setState(newState: State) {
            key.value++
            state.value = newState
        }

        return () => (
            <Transition name="as-transition-slide-x">
                {state.value == "menu" ? <MainMenu key={key.value} onStart={() => setState("game")} onSettings={() => setState("settings")} />
                    : state.value == "settings" ? <SettingsView key={key.value} onBack={() => setState("menu")} />
                        : <GameView onReset={() => setState("game")} onExit={() => setState("menu")} key={key.value} />}
            </Transition>
        )
    }
}))