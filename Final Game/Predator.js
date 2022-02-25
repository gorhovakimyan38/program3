let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 15
    }

    mul() {
        this.energy-=2
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3
            var pred = new Predator(newX, newY, 3);
            predatorArr.push(new Predator(newX, newY, 3))
			this.energy = 6;
        }
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
        var grassEaterCells = super.chooseCell(1)
        var newCell = grassEaterCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			for (var i in grassEaterArr) {
				if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
					grassEaterArr.splice(i, 1)
				}
			}

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 12) {
				this.mul();
				this.energy = 8
			}

		}
        else {
            this.move()
        }
    }

    die()  {
		matrix[this.y][this.x] = 0;
		for (var i in predatorArr) {
			if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
				predatorArr.splice(i, 1)
			}
		}
	}
}