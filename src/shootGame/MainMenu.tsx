import { defineComponent } from "vue"
import { eventDecorator } from "../eventDecorator"
import { installPrompt, swState } from "../pwa"
import { Button } from "../vue3gui/Button"
import { Aberration } from "./Aberration"

export const MainMenu = eventDecorator(defineComponent({
    name: "MainMenu",
    emits: {
        start: () => true,
        settings: () => true
    },
    setup(props, ctx) {
        return () => (
            <div class="flex-fill flex row bg-black monospace user-select-none">
                <div class="flex column p-4 pt-10 gap-10">
                    <Aberration class="title" large>
                        BetaVoltaic
                    </Aberration>
                    <div class="flex column gap-4">
                        <Button onClick={() => ctx.emit("start")} clear>
                            <Aberration>
                                Start
                            </Aberration>
                        </Button>
                        <Button onClick={() => ctx.emit("settings")} clear>
                            <Aberration>
                                Settings
                            </Aberration>
                        </Button>
                        {swState.value == "update" && <Button onClick={() => location.reload()} clear>
                            <Aberration>
                                Update Available
                            </Aberration>
                        </Button>}
                        {installPrompt.value != null && <Button onClick={() => installPrompt.value?.()} clear>
                            <Aberration>
                                Install
                            </Aberration>
                        </Button>}
                    </div>
                </div>
                <img src="/picture.png" class="img-scale-down" />
            </div>
        )
    }
}))