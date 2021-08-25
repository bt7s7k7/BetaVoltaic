import { defineComponent } from "vue"
import { eventDecorator } from "../eventDecorator"
import { Button } from "../vue3gui/Button"

export const MainMenu = eventDecorator(defineComponent({
    name: "MainMenu",
    emits: {
        start: () => true
    },
    setup(props, ctx) {
        return () => (
            <div>
                <Button onClick={() => ctx.emit("start")}>Start</Button>
            </div>
        )
    }
}))