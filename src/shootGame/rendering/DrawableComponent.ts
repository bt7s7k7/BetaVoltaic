import { Drawer } from "../../drawer/Drawer"
import { Component } from "../../entitySystem/Component"
import { RenderDirector } from "./RenderDirector"

export class DrawableComponent extends Component {
    get renderer() {
        return RenderDirector.current!
    }

    public drawSprite(drawer: Drawer, deltaTime: number) {
        // Virtual
    }
}