Crafty.c('Sky', {
    init: function() {
        this.addComponent("2D, Canvas, sky");
        this.attr({
            x: 0,
            y: 0,
            w: Crafty.viewport.width,
            h: Crafty.viewport.height
        });
        return this;
    }
});
