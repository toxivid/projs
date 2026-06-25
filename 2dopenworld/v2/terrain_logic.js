export let all_trees = {}

class create_tree {
    constructor() {
        this.x = (Math.random() - 0.5) * 25000
        this.y = (Math.random() - 0.5) * 25000
        this.size = (Math.random() * 50) + 25
    }
}

for (let i = 0; i < 50000; i++) {
    all_trees["tree" + i] = new create_tree()
}