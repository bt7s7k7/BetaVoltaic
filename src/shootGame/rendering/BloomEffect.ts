import { Color } from "../../drawer/Color"
import { Drawer } from "../../drawer/Drawer"
import { PostProcess } from "./PostProcess"

export class BloomEffect extends PostProcess {
    public readonly modifier = new Drawer()
    public readonly renderer = new Drawer()
    public brightness = 2
    public blur = 20

    public render(target: Drawer) {
        target.save()
        this.modifier.matchSize(target).setStyle(Color.black).fillRect()
        this.renderer.matchSize(target).setStyle(Color.black).fillRect()

        this.modifier.ctx.filter = `invert(100%) brightness(${this.brightness * 100}%)`
        this.modifier.blit(target)
        this.renderer.blit(this.modifier)
        this.modifier.ctx.filter = `invert(100%) brightness(${(1 / this.brightness) * 100}%)`
        this.modifier.blit(this.renderer)
        this.renderer.blit(this.modifier)
        this.modifier.ctx.filter = `blur(${this.blur}px)`
        this.modifier.blit(this.renderer)
        target.ctx.globalCompositeOperation = "lighter"
        target.blit(this.modifier)

        target.restore()
    }
}