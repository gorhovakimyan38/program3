let LivingCreature5 = require('./LivingCreature')
module.exports = class Human extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.gun = [Math.floor * (Math.random)]
        this.energy = 8
    }

    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy--
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

    kill() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * grassEaterCells.length ||  emptyCells[Math.floor(Math.random() * predatorCells.length)]

        if(newCell && this.gun == 1) {
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
    die() {
        matrix[this.y][this.x] = 0;
    }
}
