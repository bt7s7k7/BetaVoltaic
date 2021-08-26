import { Color } from "../drawer/Color"
import { Drawer } from "../drawer/Drawer"
import { Point } from "../drawer/Point"
import { Rect } from "../drawer/Rect"
import { DrawerInput } from "../drawerInput/DrawerInput"
import { Component } from "../entitySystem/Component"
import { EntitySystem } from "../entitySystem/EntitySystem"
import { DISPOSE } from "../eventLib/Disposable"
import { RangerPrefab } from "./enemy/RangerPrefab"
import { DynamicComponent } from "./physics/DynamicComponent"
import { PhysicsSystem } from "./physics/PhysicsSystem"
import { CameraFollower } from "./player/CameraFollower"
import { GameInput } from "./player/GameInput"
import { PlayerPrefab } from "./player/PlayerPrefab"
import { Camera } from "./rendering/Camera"
import { DrawableComponent } from "./rendering/DrawableComponent"
import { PlayerCameraPrefab } from "./rendering/PlayerCameraPrefab"
import { Transform } from "./Transform"

export class Game extends Component {
    public readonly cameraEntity
    public readonly playerEntity
    public readonly input = new GameInput(this)
    public readonly physics = new PhysicsSystem(this)

    public [DISPOSE]() {
        this.system.unregisterComponent(this)
        this.system.dispose()
    }

    public update(drawer: Drawer, deltaTime: number) {
        if (deltaTime > 0.5) deltaTime = 0.5
        this.input.update()

        for (const dynamic of this.system.iterateComponents(DynamicComponent)) {
            dynamic.update(deltaTime)
        }

        this.physics.update(deltaTime)

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

        this.system.spawn(builder => builder
            .addComponent(Transform)
            .addComponent(class extends DrawableComponent {
                public readonly transform = Component.ref(Transform)
                public drawSprite(drawer: Drawer) {
                    const center = this.renderer.worldToScreen(this.transform.pos)
                    const rect = Rect.extends(center, Point.one.mul(this.renderer.zoom))

                    drawer.setStyle(Color.white).fillRect(rect)
                }
            })
            .build()
        )

        this.system.spawn(RangerPrefab(new Point(0, -5)))

        this.cameraEntity.getComponent(CameraFollower).target = this.playerEntity.getComponent(Transform)

        this.playerEntity.getComponent(Transform).move(new Point(5, 5))
    }
}