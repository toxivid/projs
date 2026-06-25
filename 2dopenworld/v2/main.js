import { moving } from "./player_logic.js"
import { camera } from "./player_logic.js"
import { all_trees } from "./terrain_logic.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let player = {
    size: {
        width: 20,
        height: 20,
    }
}

function game_loop() {
    if (moving.up) {
        camera.coordinates.y -= camera.speed
    }
    if (moving.down) {
        camera.coordinates.y += camera.speed
    }
    if (moving.left) {
        camera.coordinates.x -= camera.speed
    }
    if (moving.right) {
        camera.coordinates.x += camera.speed
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw background
    ctx.fillStyle = "aqua"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // draw player
    ctx.fillStyle = "red"
    ctx.fillRect((canvas.width / 2) - player.size.width / 2, (canvas.height / 2) - player.size.height / 2, player.size.width, player.size.height)
    
    // get trees & draw them
    let trees = Object.keys(all_trees)
    for (let i = 0; i < trees.length; i++) {
        let tree_x = all_trees[trees[i]].x
        let tree_y = all_trees[trees[i]].y
        let tree_size = all_trees[trees[i]].size
        
        if (((camera.coordinates.x - tree_x) >= 0 - canvas.width / 2) && ((camera.coordinates.x - tree_x) <= 0 + canvas.width / 2) && ((camera.coordinates.y - tree_y) >= 0 - canvas.height / 2) && ((camera.coordinates.y - tree_y) <= 0 + canvas.height / 2)) {
            ctx.fillStyle = "green"
            ctx.fillRect(tree_x - camera.coordinates.x + canvas.width / 2, tree_y - camera.coordinates.y + canvas.height / 2, tree_size, tree_size)
        }
        
    }
    // update p
    document.getElementById("coordinates").textContent = `coordinates: x=${camera.coordinates.x}, y=${camera.coordinates.y}`
    requestAnimationFrame(game_loop)
}

game_loop()