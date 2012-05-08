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