export let all_lakes = {}
export let all_trees = {}

let terain_config = {
    trees: {
        maximum: 60000,
        spawnrange: 25000,
    },
    lakes: {
        maximum: 3,
        spawnrange: 40000,
    }
}

class create_lake {
    constructor() {
        this.x = (Math.random() - 0.5) * terain_config.lakes.spawnrange
        this.y = (Math.random() - 0.5) * terain_config.lakes.spawnrange
        this.size = (Math.random() * 500) + 100
    }
}

for (let i = 0; i < terain_config.lakes.maximum; i++) {
    all_lakes["lake" + i] = new create_lake()
} 

class create_tree {
    constructor() {
        this.x = (Math.random() - 0.5) * terain_config.trees.spawnrange
        this.y = (Math.random() - 0.5) * terain_config.trees.spawnrange
        this.size = (Math.random() * 50) + 25
    }
}

for (let i = 0; i < terain_config.trees.maximum; i++) {
    all_trees["tree" + i] = new create_tree()
} // create the first basic terrain 0 logic just spamming