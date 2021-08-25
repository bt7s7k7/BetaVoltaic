import { defineComponent } from "vue"
import { Scene } from "../../shootGame/Scene"

export const Home = defineComponent({
    name: "Home",
    setup(props, ctx) {
        return () => (
            <Scene />
        )
    }
})