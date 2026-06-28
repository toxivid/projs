import { camera } from "./player_logic.js"
import { player } from "./player_logic.js"
import { all_lakes } from "./terrain_logic.js"
import { all_trees } from "./terrain_logic.js"
import { trees } from "./terrain_logic.js"
import { lakes } from "./terrain_logic.js"
import { online_players } from "./online_logic.js"
import { online } from "./online_logic.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const coordinates = document.getElementById("coordinates")
const stamina = document.getElementById("stamina")

const tree_icon = new Image()
let image_loaded = false
tree_icon.src = "tree.ico"
tree_icon.onload = () => {
    image_loaded = true
}

function game_loop() {
    // clear everything
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // draw background
    ctx.fillStyle = "#805500"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // get lakes & draw them
    ctx.fillStyle = "aqua"
    for (let i = 0; i < lakes.length; i++) {
        const lake = all_lakes[lakes[i]]
        const lake_x = lake.x
        const lake_y = lake.y
        const lake_size = lake.size
        
        if (((camera.coordinates.x - lake_x) >= 0 - canvas.width / 2) && 
        ((camera.coordinates.x - lake_x - lake_size) <= 0 + canvas.width / 2) && 
        ((camera.coordinates.y - lake_y) >= 0 - canvas.height / 2) && 
        ((camera.coordinates.y - lake_y - lake_size) <= 0 + canvas.height / 2)) {
            ctx.fillRect(lake_x - player.size.width / 2 - camera.coordinates.x + canvas.width / 2, lake_y - player.size.height - camera.coordinates.y + canvas.height / 2, lake_size, lake_size)
        }
    }

    // draw player
    ctx.fillStyle = "red"
    ctx.fillRect((canvas.width / 2) - player.size.width / 2, (canvas.height / 2) - player.size.height / 2, player.size.width, player.size.height)

    // get trees & draw them
    for (let i = 0; i < trees.length; i++) {
        const tree = all_trees[trees[i]]
        const tree_x = tree.x
        const tree_y = tree.y
        const tree_size = tree.size
        
        if (((camera.coordinates.x - tree_x) >= 0 - canvas.width / 2)  && 
        ((camera.coordinates.x - tree_x - tree_size) <= 0 + canvas.width / 2)  && 
        ((camera.coordinates.y - tree_y) >= 0 - canvas.height / 2) && 
        ((camera.coordinates.y - tree_y - tree_size) <= 0 + canvas.height / 2)) {
            ctx.drawImage(tree_icon, tree_x - camera.coordinates.x + canvas.width / 2, tree_y - camera.coordinates.y + canvas.height / 2, tree_size, tree_size)
        }
    }

    if (online) {
        for (let i = 0; i < Object.keys(online_players).length; i++) {
            let player_x = online_players[Object.keys(online_players)[i]].x
            let player_y = online_players[Object.keys(online_players)[i]].y
            let player_uid = online_players[Object.keys(online_players)[i]].uid
            let player_size = 20

            if ((player_uid !== player.uid) &&
            ((camera.coordinates.x - player_x) >= 0 - canvas.width / 2)  && 
            ((camera.coordinates.x - player_x) <= 0 + canvas.width / 2)  && 
            ((camera.coordinates.y - player_y) >= 0 - canvas.height / 2) && 
            ((camera.coordinates.y - player_y) <= 0 + canvas.height / 2)) {
                ctx.fillRect(player_x - camera.coordinates.x + canvas.width / 2, player_y - camera.coordinates.y + canvas.height / 2, player_size, player_size)
            }
        }
    }

    // update p
    coordinates.textContent = `coordinates: x=${camera.coordinates.x}, y=${camera.coordinates.y}`
    stamina.textContent = `stamina=${Math.floor(player.stamina)}` // if no Math.floor it will spam decimal numbers
    
    requestAnimationFrame(game_loop)
}

game_loop()