import { reactive, watch } from "vue"

const LS_KEY = "beta-voltaic:settings"

export namespace Settings {
    export const value = reactive({
        highScore: "0.00",
        aberration: true,
        bloom: true,
        slowMotion: false,
        invulnerability: false,
        fpsMeter: false,
        forceLandscape: false,
        touchControls: false,
        fireCenter: false,
        smallScreen: false,
    })

    {
        const stored = localStorage.getItem(LS_KEY)
        if (stored) {
            Object.assign(value, JSON.parse(stored))
        }
    }

    watch(() => value, () => {
        localStorage.setItem(LS_KEY, JSON.stringify(value))
    }, { deep: true })
}