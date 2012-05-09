Crafty.c('Wolf', {
    init: function() {
        this.addComponent("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, skoll, SpriteAnimation, Mouse, Collision, MouseHover");
        return this;
    }
});