let LivingCreature4 = require("./LivingCreature")
module.exports = class Cactus extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.prickly = [Math.floor*(Math.random)]
    }
    kill() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * grassEaterCells.length ||  emptyCells[Math.floor(Math.random() * predatorCells.length)]

        if(newCell && this.prickly == 1) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy++
        }
        else {
            this.move()
        }
    }
}