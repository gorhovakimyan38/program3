let LivingCreature = require('./LivingCreature')
module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            var emptyCells = super.chooseCell(0);
            var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (newCell && this.multiply >= 5) {
                var x = newCell[0];
                var y = newCell[1];

                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
                this.multiply = 0;
            }
        }
    }
}