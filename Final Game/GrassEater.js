let LivingCreature= require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8
    }

    mul() {
        this.energy-=2
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2
            var grEater = new GrassEater(newX, newY, 2);
            grassEaterArr.push(new GrassEater(newX, newY, 2))
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
        var grassCells = super.chooseCell(1);
		var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			for (var i in grassArr) {
				if (grassArr[i].x == newX && grassArr[i].y == newY) {
					grassArr.splice(i, 1)
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

    die() {
		matrix[this.y][this.x] = 0;
		for (var i in grassEaterArr) {
			if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
				grassEaterArr.splice(i, 1)
			}
		}
	}
}
