import { nextTick, ref, watch } from "vue"
import { Settings } from "./Settings"

const app = document.getElementById("app")!

export const isLandscape = ref(false)

function calculateForceLandscape() {
    const forceLandscape = Settings.value.forceLandscape
        && window.innerHeight > window.innerWidth

    if (forceLandscape) {
        app.classList.add("as-force-landscape")
    } else {
        app.classList.remove("as-force-landscape")
    }

    isLandscape.value = forceLandscape
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