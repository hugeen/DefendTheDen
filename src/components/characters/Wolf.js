Crafty.c('Wolf', {
    init: function() {
        this.addComponent("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, skoll, SpriteAnimation, Mouse, Collision, MouseHover");
        this.origin("center");
        this.collision(new Crafty.polygon([[60,34],[82,18],[99,44],[81,57],[82,86],[76,107],[64,117],[33,109],[44,73], [46,60]]));
        return this;
    }
});