import { Drawer } from "../../drawer/Drawer"
import { Point } from "../../drawer/Point"
import { Rect } from "../../drawer/Rect"
import { ARENA_RADIUS, ARENA_RADIUS_SQR, TILE_BASE_COLOR, TILE_SIZE } from "../constants"
import { Camera } from "./Camera"

const floorBuffer = new Drawer()
let lastZoom = NaN

export namespace FloorRenderer {
    export function drawFloor(camera: Camera, target: Drawer) {
        if (lastZoom != camera.zoom) {
            const zoom = lastZoom = camera.zoom
            floorBuffer.setSize(Point.one.mul(ARENA_RADIUS * 2 * zoom))

            floorBuffer.save()

            floorBuffer
                .beginPath()
                .arc(floorBuffer.size.center(), (ARENA_RADIUS) * zoom)
                .clip()

            const screenTileSize = TILE_SIZE * zoom

            const sX = Math.floor(floorBuffer.size.width / zoom / TILE_SIZE) + 1
            const sY = Math.floor(floorBuffer.size.height / zoom / TILE_SIZE) + 1
            const oX = - sX / 2 + TILE_SIZE
            const oY = - sY / 2 + TILE_SIZE
            for (let x = -1; x < sX; x++)
                for (let y = -1; y < sY; y++) {
                    const screenX = x * screenTileSize
                    const screenY = y * screenTileSize

                    if ((x + oX) * (x + oX) + (y + oY) * (y + oY) > ARENA_RADIUS_SQR) continue

                    const value = parseFloat("0." + Math.sin(x + y * 50).toString().substr(6))


                    floorBuffer
                        .setFillStyle(TILE_BASE_COLOR.mul(0.5 + value * 0.5))
                        .fillRect(new Rect(screenX, screenY, screenTileSize, screenTileSize))
                }
            floorBuffer.restore()
        }

        target.blit(floorBuffer, target.size,
            target.size
                .translate(camera.worldToScreen(Point.zero).mul(-1))
                .translate(floorBuffer.size.center())
        )
    }
}