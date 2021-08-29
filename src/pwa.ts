import { ref } from "vue"

type SWState = "normal" | "update" | "dev"
export const swState = ref<SWState>(import.meta.env.PROD ? "normal" : "dev")
export const installPrompt = ref<(() => void) | null>(null)

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

    // @ts-ignore
    window.addEventListener("beforeinstallprompt", (event: Event & { userChoice: Promise<{ outcome: string }>, prompt(): void }) => {
        event.preventDefault()
        // eslint-disable-next-line no-console
        console.log("Ready to install!")
        installPrompt.value = () => {
            event.prompt()
            installPrompt.value = null

            event.userChoice.then(choice => {
                // eslint-disable-next-line no-console
                console.log("Install prompt:", choice)
            })
        }
    })
}