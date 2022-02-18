let Cactus = require('Cactus')
module.exports = class Cactus extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.prickly = (Math.round*(Math.random))
    }
}