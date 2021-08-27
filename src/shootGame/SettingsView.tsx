import { defineComponent } from "vue"
import { eventDecorator } from "../eventDecorator"
import { Button } from "../vue3gui/Button"
import { Aberration } from "./Aberration"
import { Settings } from "./Settings"
import { Toggle } from "./Toggle"

export const SettingsView = eventDecorator(defineComponent({
    name: "SettingsView",
    emits: {
        back: () => true
    },
    setup(props, ctx) {
        return () => (
            <div class="flex-fill flex column bg-black monospace user-select-none p-4">
                <div class="flex-fill flex column gap-2 as-settings-view">
                    <div class="label">General</div>
                    <div class="category">
                        <div onClick={() => Settings.value.forceLandscape = !Settings.value.forceLandscape}>Force landscape</div>
                        <Toggle vModel={Settings.value.forceLandscape} />
                        <div>Touch controls</div>
                        <Toggle vModel={Settings.value.touchControls} />
                    </div>
                    <div class="label">Graphics</div>
                    <div class="category">
                        <div>Chromatic aberration</div>
                        <Toggle vModel={Settings.value.aberration} />
                        <div>Bloom</div>
                        <Toggle vModel={Settings.value.bloom} />
                    </div>
                    <div class="label">Other</div>
                    <div class="category">
                        <div>Show FPS</div>
                        <Toggle vModel={Settings.value.fpsMeter} />
                        <div>Slow motion</div>
                        <Toggle vModel={Settings.value.slowMotion} />
                        <div>Invulnerability</div>
                        <Toggle vModel={Settings.value.invulnerability} />
                    </div>
                </div>
                <div class="flex row">
                    <Button onClick={() => ctx.emit("back")}>
                        <Aberration>Back</Aberration>
                    </Button>
                </div>
            </div>
        )
    }
}))