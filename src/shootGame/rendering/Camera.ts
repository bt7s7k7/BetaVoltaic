import { Drawer } from "../../drawer/Drawer"
import { Component } from "../../entitySystem/Component"
import { Transform } from "../Transform"
import { RenderDirector } from "./RenderDirector"

export class Camera extends Component {
    public readonly transform = Component.ref(Transform)

    public zoom = 40

    public draw(drawer: Drawer, deltaTime: number) {
        RenderDirector.render(drawer, deltaTime, this)
    }

    public init() {
        super.init()
    }
}