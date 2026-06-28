export let trees = [];
export let lakes = [];

export let all_lakes = {}
export let all_trees = {}
window.all_lakes = all_lakes
window.all_trees = all_trees

export let terrain_config = {
    trees: {
        amount: 20000,
    },
    lakes: {
        amount: 50,
    },
    spawnrange: 10000,
}

class create_lake {
    constructor() {
        this.x = (Math.random() - 0.5) * terrain_config.spawnrange
        this.y = (Math.random() - 0.5) * terrain_config.spawnrange
        this.size = (Math.random() * 1000) + 100
    }
}

let e = 0
function create_lakes() {
    if (e < terrain_config.lakes.amount) {
        all_lakes["lake" + e] = new create_lake()
        e++
        setTimeout(create_lakes)
    } else {
        lakes = Object.keys(all_lakes)
    }
}

create_lakes()

class create_tree {
    constructor() {
        this.x = (Math.random() - 0.5) * terrain_config.spawnrange
        this.y = (Math.random() - 0.5) * terrain_config.spawnrange
        this.size = (Math.random() * 50) + 25
    }
}

let i = 0;
function create_trees() {
    if (i < terrain_config.trees.amount) {
        let tree = all_trees["tree" + i] = new create_tree() // just learned this kinda interesting i never thought this would work double = but because it works crazy faster code
        if (check_touching_lake(tree.x, tree.y)) {
            delete(all_trees["tree" + i])
        } else {
            i++
        }
        setTimeout(create_trees)
    } else {
        trees = Object.keys(all_trees)
    }
}

create_trees()

export function check_touching_lake(x, y) {
    for (let i = 0; i<Object.keys(all_lakes).length; i++) {
        if (x>all_lakes[Object.keys(all_lakes)[i]].x && 
        y>all_lakes[Object.keys(all_lakes)[i]].y &&
        x<all_lakes[Object.keys(all_lakes)[i]].x + all_lakes[Object.keys(all_lakes)[i]].size && 
        y<all_lakes[Object.keys(all_lakes)[i]].y + all_lakes[Object.keys(all_lakes)[i]].size) {
            return true
        }
    }
    return false
}

// for (let i = 0; i < terrain_config.trees.amount; i++) {
//     all_trees["tree" + i] = new create_tree()
//     console.log(check_touching_lake(all_trees["tree" + i].x, all_trees["tree" + i].y), "tree" + i)
// } // create the first basic terrain 0 logic just spamming