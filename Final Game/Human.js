let LivingCreature = require('./LivingCreature')
module.exports = class Human extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.gun = 0
        this.energy = 8
    }

    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy--;
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

   eat() {
        var grassEaterCells = super.chooseCell(2)
        var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length )]

        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            for (var i in grassEaterArr) {
				if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
					grassEaterArr.splice(i, 1)
                    break
				}
			}

            this.x = newX
            this.y = newY
            this.energy++
            this.gun++
            if(this.gun > 1) {
                this.gun = 1
            }
        }
        else {
            this.move()
        }
    }
    die()  {
		matrix[this.y][this.x] = 0;
		for (var i in humanArr) {
			if (humanArr[i].x == this.x && humanArr[i].y == this.y) {
				humanArr.splice(i, 1)
                break
			}
		}
	}
}
