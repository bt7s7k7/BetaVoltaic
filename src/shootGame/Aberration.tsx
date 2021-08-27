import { defineComponent } from "vue"

export const Aberration = (defineComponent({
    name: "Aberration",
    props: {
        large: { type: Boolean }
    },
    setup(props, ctx) {
        return () => (
            <div class={["aberration", props.large && "large"]}>
                <div>{ctx.slots.default?.()}</div>
                <div>{ctx.slots.default?.()}</div>
                <div>{ctx.slots.default?.()}</div>
                <div>{ctx.slots.default?.()}</div>
            </div>
        )
    }
}))