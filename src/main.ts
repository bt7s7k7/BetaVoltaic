import { createApp } from "vue"
import { App } from "./app/App"
import { router } from "./app/router"
import { swState } from "./swState"
import { DARK_THEME } from "./vue3gui/themes/dark"
import { ThemeSwitch } from "./vue3gui/ThemeSwitch"

new ThemeSwitch().registerTheme(DARK_THEME).setTheme("dark")

const app = createApp(App)

app.use(router)

app.mount("#app")

if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
    })

    navigator.serviceWorker.addEventListener("message", message => {
        if (typeof message.data == "object" && message.data.type == "update") {
            swState.value = "update"
            // eslint-disable-next-line no-console
            console.log("Received update message from sw")
        }
    })
}

