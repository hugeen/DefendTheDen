Crafty.c('Earth', {
    init: function() {
        this.addComponent("2D, Canvas, earth");
        this.attr({
            x: 0,
            y: 0,
            w: Crafty.viewport.width,
            h: Crafty.viewport.height
        });
        return this;
    }
});
