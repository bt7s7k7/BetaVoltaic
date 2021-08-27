import { PlayerController } from "../player/PlayerController"

interface EffectOptions {
    label: string
    onStart?: (player: PlayerController) => void
    onEnd?: (player: PlayerController) => void
    duration: number
}

export class EffectType {
    constructor(
        options: EffectOptions,
        public readonly label = options.label,
        public readonly onStart = options.onStart,
        public readonly onEnd = options.onEnd,
        public readonly duration = options.duration
    ) { }
}

export class Effect {
    public time = this.type.duration

    constructor(
        public readonly type: EffectType
    ) { }
}