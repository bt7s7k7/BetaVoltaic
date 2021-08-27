import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { PostProcess } from "./PostProcess"

export class AberrationEffect extends PostProcess {
    public readonly buffer = new Drawer()
    public readonly modifier = new Drawer()

    public render(target: Drawer) {
        this.buffer.matchSize(target).setStyle(Color.black).fillRect()
        this.modifier.matchSize(target).setStyle(Color.black).fillRect()
        this.buffer.blit(target)
        target.setStyle(Color.black).fillRect()

        const center = target.size.center()

        target.save()
        target.ctx.globalCompositeOperation = "lighter"

        this.modifier.save()
        this.modifier.blit(this.buffer)
        this.modifier.ctx.globalCompositeOperation = "multiply"
        this.modifier.setStyle(Color.red).fillRect()
        target
            .save()
            .translate(center)
            .scale(0.99)
            .translate(center.mul(-1))
            .blit(this.modifier)
            .restore()
        this.modifier.restore()

        this.modifier.save()
        this.modifier.blit(this.buffer)
        this.modifier.ctx.globalCompositeOperation = "multiply"
        this.modifier.setStyle(Color.green).fillRect()
        target.blit(this.modifier)
        this.modifier.restore()

        this.modifier.save()
        this.modifier.blit(this.buffer)
        this.modifier.ctx.globalCompositeOperation = "multiply"
        this.modifier.setStyle(Color.blue).fillRect()
        target
            .save()
            .translate(center)
            .scale(1.01)
            .translate(center.mul(-1))
            .blit(this.modifier)
            .restore()
        this.modifier.restore()

        target.restore()
    }
}