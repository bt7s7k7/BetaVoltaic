export class Timeout {
    protected remaining = 0

    public restart() {
        this.remaining = this.timeout
    }

    public update(deltaTime: number) {
        if (this.remaining > 0) this.remaining -= deltaTime
    }

    public done() {
        return this.remaining <= 0
    }

    constructor(
        protected timeout: number
    ) { }
}