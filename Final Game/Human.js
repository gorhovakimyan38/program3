class Human {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.gun = true && false
        this.multiply = 0
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            console.log(newCell)
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
        if (this.gun = true) {
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
        if (this.gun = true) {
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
    for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
        }
    }
}
}
