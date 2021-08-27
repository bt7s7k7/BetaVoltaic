import { reactive, watch } from "vue"

const LS_KEY = "beta-voltaic:settings"

export namespace Settings {
    export const value = reactive({
        highScore: "0.00"
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