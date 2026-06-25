export let camera = {
    coordinates: {
        x: 0,
        y: 0,
    },
    speed: 3,
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
})