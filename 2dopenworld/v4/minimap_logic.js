import { camera } from "./player_logic.js"
import { terrain_config } from "./terrain_logic.js"
import { all_lakes } from "./terrain_logic.js"

const canvas = document.getElementById("minimap")
const ctx = canvas.getContext("2d")

function loop() {
    let lakes = Object.keys(all_lakes)
    ctx.fillStyle = "#805500"
    ctx.fillRect(0, 0, 200, 200)

    ctx.fillStyle = "red"
    ctx.fillRect(camera.coordinates.x / 200 - 2 + 100, camera.coordinates.y / 200 - 2 + 100, 4, 4)
    
    ctx.fillStyle = "aqua"
    
    for (let i = 0; i < lakes.length; i++) {
        const lake_x = all_lakes[lakes[i]].x
        const lake_y = all_lakes[lakes[i]].y
        const lake_size = all_lakes[lakes[i]].size

        ctx.fillStyle = "aqua"
        ctx.fillRect(lake_x / 200 + 100, lake_y / 200 + 100, lake_size / 200, lake_size / 200)
    }

    setTimeout(loop, 1000)
}

loop()