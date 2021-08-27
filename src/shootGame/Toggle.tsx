import { defineComponent } from "vue"
import { eventDecorator } from "../eventDecorator"
import { Button } from "../vue3gui/Button"

export const Toggle = eventDecorator(defineComponent({
    name: "Toggle",
    props: {
        modelValue: { type: Boolean }
    },
    emits: {
        "update:modelValue": (v: boolean) => true
    },
    setup(props, ctx) {
        return () => (
            <Button onClick={() => ctx.emit("update:modelValue", !props.modelValue)} class={[props.modelValue ? "enabled" : "disabled"]}>
                {props.modelValue ? "Enabled" : "Disabled"}
            </Button>
        )
    }
}))