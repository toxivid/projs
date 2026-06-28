import { check_touching_lake } from "./terrain_logic.js"

export let camera = {
    coordinates: {
        x: 0,
        y: 0,
    },
    speed: 1.5,
}

window.camera = camera

export let player = {
    size: {
        width: 20,
        height: 20,
    },
    health: 100,
    stamina: 100,
    sprinting: false,
}

window.player = player

// if first time entering site create uid
if (localStorage.getItem("uid") === null) {
    let chars = "abcdefghijklmnopqrstuvwxyz1234567890"
    let uid = ""
    for (let i = 0; i < 10; i++) {
        uid = uid + chars[Math.floor(Math.random() * chars.length)]
        console.log(uid)
    }
    player.uid = uid
    localStorage.setItem("uid", uid)
} else {
    player.uid = localStorage.getItem("uid")
}


export let moving = {
    left: false,
    right: false,
    up: false,
    down: false,
}

document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
        moving.up = true
    }
    if (event.key === "s") {
        moving.down = true
    }
    if (event.key === "a") {
        moving.left = true
    }
    if (event.key === "d") {
        moving.right = true
    }
    if (event.key === "Shift") {
        player.sprinting = true
    }
})

document.addEventListener("keyup", function(event) {
    if (event.key === "w") {
        moving.up = false
    }
    if (event.key === "s") {
        moving.down = false
    }
    if (event.key === "a") {
        moving.left = false
    }
    if (event.key === "d") {
        moving.right = false
    }
    if (event.key === "Shift") {
        player.sprinting = false
    }
})

function sprintloop() { // bad code, improvements?
    if (check_touching_lake(camera.coordinates.x, camera.coordinates.y)) {
        console.log("touching lake")
        if (player.sprinting) {
            if (player.stamina >= 0) {
                camera.speed = 1
                player.stamina -= 1
            } else {
                camera.speed = 0.75
            }
        } else {
            camera.speed = 0.75
            if (player.stamina < 100) {
                player.stamina += 0.4
            }
        }
    } else {
        if (player.sprinting) {
            if (player.stamina >= 0) {
                camera.speed = 2
                player.stamina -= 1
            } else {
                camera.speed = 1.5
            }
        } else {
            camera.speed = 1.5
            if (player.stamina < 100) {
                player.stamina += 0.4
            }
        }
    }
    setTimeout(sprintloop, 10)
}

sprintloop()

function loop() {
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
    requestAnimationFrame(loop) // which loop handler?
}

loop()