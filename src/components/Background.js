Crafty.c('Background', {
    init: function() {
        this.addComponent("2D, Canvas, background");
        this.attr({
            w: Crafty.viewport.width,
            h: Crafty.viewport.height
        });
        return this;
    }
});
