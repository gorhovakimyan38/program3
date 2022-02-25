let LivingCreature = require("./LivingCreature")
module.exports = class Cactus extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.prickly = [Math.floor * (Math.random)]
    }
    eat() {
        var grassEaterCells = super.chooseCell(1)
        var newCell = grassEaterCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.prickly == 1) {

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

        }
    }
}