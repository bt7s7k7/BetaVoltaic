import { createApp } from "vue"
import { App } from "./app/App"
import { router } from "./app/router"
import "./pwa"
import { DARK_THEME } from "./vue3gui/themes/dark"
import { ThemeSwitch } from "./vue3gui/ThemeSwitch"

new ThemeSwitch().registerTheme(DARK_THEME).setTheme("dark")

const app = createApp(App)

app.use(router)

app.mount("#app")

