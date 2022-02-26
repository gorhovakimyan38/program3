let LivingCreature = require("./LivingCreature")
module.exports = class Cactus extends LivingCreature {
    constructor(x, y) {
        super(x, y);
    }
    eat() {
        var grassEaterCells = super.chooseCell(2)
        var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)]

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        }
    }
}