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
Crafty.c('Clouds', {
    init: function() {
        this.addComponent("2D, Canvas, clouds");
        this.attr({
            x: 0,
            y: 0,
            z: 0,
            w: 916,
            h: 114
        });
        this.bind("EnterFrame", function() {
            if(this._x >= 916) {
                this.attr({x: -916});
            }
            this.attr({x: this._x+0.25});    
        });
        return this;
    }
});
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
Crafty.c('MenuItem', {
    init: function() {
        this.addComponent("2D, Canvas, Text, Mouse, MouseHover");
        this.attr({x: 275, y: 280, w: 300, h: 38 });
        this.textColor('#FFFFFF', 0.6);
        this.textFont({ size: '38px', type: 'italic', family: "'Marck Script', cursive" });
        this.bind('MouseOver', function(){
            this.textColor('#FFFFFF', 1);
        });
        this.bind('MouseOut', function(){
            this.textColor('#FFFFFF', 0.6);
        });
        return this;
    }
});
