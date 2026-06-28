import { camera } from "./player_logic.js"
import { player } from "./player_logic.js"

export let online = false
export let online_players = {};

const checkbox_online = document.getElementById("online") // instead of a loop that takes a lot of memory usage and slows the site down we use this event listener
checkbox_online.addEventListener("change", function(event) {
    online = checkbox_online.checked
})

function loop() {
    if (online) {
        async function get_online_players() {
            const res = await fetch("https://game-backend-7b761-default-rtdb.europe-west1.firebasedatabase.app/players/.json")
            online_players = await res.json();
        }

        get_online_players()

        async function post_online_players() {
            await fetch(
                `https://game-backend-7b761-default-rtdb.europe-west1.firebasedatabase.app/players/${player.uid}.json`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        x: camera.coordinates.x,
                        y: camera.coordinates.y,
                        uid: player.uid
                    })
                }
            )
        }   
        post_online_players()
    } else {
        online_players = {}
    }
    setTimeout(loop, 1000)
}

loop()