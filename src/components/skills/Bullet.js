Crafty.c("Bullet", {
    init : function() {
        this.attr({
            x : -999,
            y : -999,
        });
        this.addComponent("2D, Canvas, Collision");
    },
    fire: function(from, by, _options) {
        var options = _options || {},
            speed = options.speed || 1,
            range = options.range || false;
        this.attr(from);
        this.trigger("Fired");
        this.bind("EnterFrame", function() {
            if(this._x > Crafty.viewport.width || this._x < (0-this._w) || this._y > Crafty.viewport.height || this._y < (0-this._h)) {
                this.destroy();
            }
            this.attr({
                x: this._x+(by.x*speed),
                y: this._y+(by.y*speed)
            });
        });
    }
});