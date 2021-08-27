import { defineComponent, nextTick, ref, Transition, watch } from "vue"
import { GameView } from "./GameView"
import { MainMenu } from "./MainMenu"
import { Settings } from "./Settings"
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

        const app = document.getElementById("app")!

        function calculateForceLandscape() {
            const forceLandscape = Settings.value.forceLandscape
                && window.innerHeight > window.innerWidth

            if (forceLandscape) {
                app.classList.add("as-force-landscape")
            } else {
                app.classList.remove("as-force-landscape")
            }
        }

        window.addEventListener("resize", () => {
            calculateForceLandscape()
        })

        watch(() => Settings.value.forceLandscape, () => {
            calculateForceLandscape()
        })

        nextTick(() => {
            calculateForceLandscape()
        })

        return () => (
            <Transition name="as-transition-slide-x">
                {state.value == "menu" ? <MainMenu key={key.value} onStart={() => setState("game")} onSettings={() => setState("settings")} />
                    : state.value == "settings" ? <SettingsView key={key.value} onBack={() => setState("menu")} />
                        : <GameView onReset={() => setState("game")} onExit={() => setState("menu")} key={key.value} />}
            </Transition>
        )
    }
}))