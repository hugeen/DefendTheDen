Crafty.c('Floor', {
    init: function() {
        this.addComponent("2D, Canvas, floor");
        this.attr({
            y: Crafty.viewport.height-309,
            w: Crafty.viewport.width,
            h: 309
        });
        return this;
    }
});
