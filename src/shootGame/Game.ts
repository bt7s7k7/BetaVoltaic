import { Color } from "../drawer/Color"
import { Drawer } from "../drawer/Drawer"
import { Point } from "../drawer/Point"
import { DrawerInput } from "../drawerInput/DrawerInput"
import { Component } from "../entitySystem/Component"
import { EntitySystem } from "../entitySystem/EntitySystem"
import { DISPOSE } from "../eventLib/Disposable"
import { EventEmitter } from "../eventLib/EventEmitter"
import { EnemySpawner } from "./enemy/EnemySpawner"
import { HealthSystem } from "./gameplay/HealthSystem"
import { DynamicComponent } from "./physics/DynamicComponent"
import { PhysicsSystem } from "./physics/PhysicsSystem"
import { CameraFollower } from "./player/CameraFollower"
import { GameInput } from "./player/GameInput"
import { PlayerPrefab } from "./player/PlayerPrefab"
import { Camera } from "./rendering/Camera"
import { PlayerCameraPrefab } from "./rendering/PlayerCameraPrefab"
import { Transform } from "./Transform"

export class Game extends Component {
    public readonly cameraEntity
    public readonly playerEntity
    public readonly input = new GameInput(this)
    public readonly physics = new PhysicsSystem(this)
    public readonly enemySpawner = new EnemySpawner(this)

    public time = 0
    public fps = 0
    public frameTime = 0

    public readonly onDeath = new EventEmitter()

    protected readonly healthSystem = new HealthSystem(this)
    protected fpsCounter = 0
    protected readonly fpsCounterInterval = setInterval(() => {
        this.fps = this.fpsCounter
        this.fpsCounter = 0
    }, 1000)

    public [DISPOSE]() {
        this.system.unregisterComponent(this)
        this.system.dispose()

        clearInterval(this.fpsCounterInterval)
    }

    public update(drawer: Drawer, deltaTime: number) {
        const start = performance.now()
        if (deltaTime > 0.5) deltaTime = 0.5
        this.time += deltaTime
        this.input.update()

        for (const dynamic of this.system.iterateComponents(DynamicComponent)) {
            dynamic.update(deltaTime)
        }

        this.healthSystem.update()
        this.physics.update(deltaTime)

        this.enemySpawner.update(deltaTime)

        drawer.setNativeSize()
        drawer.setStyle(Color.black).fillRect()

        this.cameraEntity.getComponent(Camera).draw(drawer, deltaTime)
        const end = performance.now()
        this.fpsCounter++
        this.frameTime = (end - start)
    }

    public getDebugText() {
        return `FPS: ${this.fps} (${this.frameTime.toFixed(1)}ms)`
    }

    constructor(
        public readonly drawerInput: DrawerInput
    ) {
        // @ts-ignore
        super(null, new EntitySystem())

        this.cameraEntity = this.system.spawn(PlayerCameraPrefab)
        this.playerEntity = this.system.spawn(PlayerPrefab)

        this.cameraEntity.getComponent(CameraFollower).target = this.playerEntity.getComponent(Transform)

        this.playerEntity.getComponent(Transform).move(new Point(5, 5))
    }
}