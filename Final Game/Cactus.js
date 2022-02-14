class Cactus extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.prickly = (Math.round*(Math.random))
    }
}