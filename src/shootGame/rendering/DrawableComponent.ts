import { Drawer } from "../../drawer/Drawer"
import { Component } from "../../entitySystem/Component"
import { Transform } from "../Transform"
import { RenderDirector } from "./RenderDirector"

export class DrawableComponent extends Component {
    public readonly transform = Component.ref(Transform)

    get renderer() {
        return RenderDirector.current!
    }

    public drawSprite(drawer: Drawer, deltaTime: number) {
        // Virtual
    }
}