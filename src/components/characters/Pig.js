Crafty.c('Pig', {
    init: function() {
        this.addComponent("2D, "+gameContainer.conf.get('renderType')+", piggy, SpriteAnimation, Collision, MouseHover, Enemy");
        this.origin("center");
        this.collision(new Crafty.polygon([[40,20],[57,33],[70,55],[69,79],[66,86],[72,102],[38,105],[39,72],[36,50], [30,42], [38,35]]));
        return this;
    }
});