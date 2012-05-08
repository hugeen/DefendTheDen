Crafty.c('Lines', {
    init: function() {
        this.addComponent("2D, Canvas, lines");
        this.attr({
            x: 0,
            y: 0,
            w: Crafty.viewport.width,
            h: Crafty.viewport.height
        });
        return this;
    }
});
