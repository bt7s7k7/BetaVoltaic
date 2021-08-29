import { ref } from "vue"
type SWState = "normal" | "update"
export const swState = ref<SWState>("normal")