class Human extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.gun = (Math.round*(Math.random))
        this.energy = 8
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eatgrassEater() {
        if (this.gun = 1) {
            var emptyCells = this.chooseCell(2)
            var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

            if (newCell) {
                this.energy++
                var newX = newCell[0]
                var newY = newCell[1]

                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1)
                        break
                    }
                }
            }
        }
        else {
            this.move()
        }
    }
    eatpredator() {
        if (this.gun = 1) {
            var emptyCells = this.chooseCell(3)
            var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

            if (newCell) {
                this.energy++
                var newX = newCell[0]
                var newY = newCell[1]

                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1)
                        break
                    }
                }
            }
        }
        else {
            this.move()
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in HumanArr) {
            if (this.x == HumanArr[i].x && this.y == HumanArr[i].y) {
                HumanArr.splice(i, 1);
                break;
            }
        }
    }
}
