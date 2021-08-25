import { Color } from "../drawer/Color"
import { Drawer } from "../drawer/Drawer"
import { Point } from "../drawer/Point"
import { DrawerInput } from "../drawerInput/DrawerInput"
import { Component } from "../entitySystem/Component"
import { EntitySystem } from "../entitySystem/EntitySystem"
import { DISPOSE } from "../eventLib/Disposable"
import { DynamicComponent } from "./physics/DynamicComponent"
import { FracFollower } from "./player/FracFollower"
import { PlayerPrefab } from "./player/PlayerPrefab"
import { Camera } from "./rendering/Camera"
import { PlayerCameraPrefab } from "./rendering/PlayerCameraPrefab"
import { Transform } from "./Transform"

export class Game extends Component {
    public readonly cameraEntity
    public readonly playerEntity

    public [DISPOSE]() {
        this.system.unregisterComponent(this)
        this.system.dispose()
    }

    public update(drawer: Drawer, deltaTime: number) {
        for (const dynamic of this.system.iterateComponents(DynamicComponent)) {
            dynamic.update(deltaTime)
        }

        drawer.setNativeSize()
        drawer.setStyle(Color.black).fillRect()

        this.cameraEntity.getComponent(Camera).draw(drawer, deltaTime)
    }

    constructor(
        public readonly drawerInput: DrawerInput
    ) {
        // @ts-ignore
        super(null, new EntitySystem())

        this.cameraEntity = this.system.spawn(PlayerCameraPrefab)
        this.playerEntity = this.system.spawn(PlayerPrefab)

        this.cameraEntity.getComponent(FracFollower).target = this.playerEntity.getComponent(Transform)

        this.playerEntity.getComponent(Transform).offset(new Point(5, 5))
    }
}