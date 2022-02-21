let LivingCreature1 = require('./LivingCreature')
module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            var emptyCells = this.chooseCell(0);
            var newCell =  emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (newCell && this.multiply >= 8) {
                var x = newCell[0];
                var y = newCell[1];

                var gr = new Grass(newX,newY,1);
                grassArr.push(gr);
                this.multiply = 0;
            }
        }
    }
}