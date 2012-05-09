var AngleIndicator = BaseEntity.extend({
	defaults: {
        'parent' : undefined,
    },
    initialize: function(){
        var parent = this.get("parent");
        if(parent === undefined) {
            return false;
        }
        
        var angleIndicator = Crafty.e("2D, Canvas, Color");
        angleIndicator.attr({
            x: parent._x+parent._w/2+35,
            y: parent._y+parent._h/2-25,
            w: 40,
            h: 10,
            z: 9999
        });
        angleIndicator.color("#969696");
        angleIndicator.bind('EnterFrame', function(e){
            
            var dx = Crafty.mousePosition.x - this._x,
                dy = Crafty.mousePosition.y - this._y,
                oldX = this._x,
                oldY = this._y,
                movX = (dx * 1) / (Math.sqrt(dx * dx + dy * dy)),
                movY = (dy * 1) / (Math.sqrt(dx * dx + dy * dy));
            this.moveByRatio = {
                x: movX,
                y: movY
            };
            this.attr({
                x: parent._x+parent._w/2+35,
                y: parent._y+parent._h/2-25,
            });
            this.rotation = Crafty.math.radToDeg(Math.atan2(dy, dx));
            
        });

    	this.set({'entity' : angleIndicator });
    	
    }
});