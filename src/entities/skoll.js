var Skoll = BaseEntity.extend({
	defaults: {
        'speed' : 10,
    },
    initialize: function(){
        
    	var skoll = Crafty.e("Wolf");
        
        skoll.attr({
            x: 0,
            y: 0,
            z: 300
        });
        
        skoll.multiway(this.get('speed'),{
            Z: -90,
            S: 90
        });
        
        skoll.bind('EnterFrame', function(e){
            
        });
        
        skoll.bind('Click', function(){
            
        });
        
        skoll.origin(skoll.w/2, skoll.h/2);
        
        var line = Crafty.e("2D, Canvas, Color");
        line.attr({
            x: skoll._x+skoll._w/2+35,
            y: skoll._y+skoll._h/2-25,
            w: 40,
            h: 10,
            z: 9999
        });
        line.color("#969696");
        line.bind('EnterFrame', function(e){
            var triangle_x = Crafty.mousePosition.x - this._x;
            var triangle_y = Crafty.mousePosition.y - this._y;
            this.attr({
                x: skoll._x+skoll._w/2+35,
                y: skoll._y+skoll._h/2-25,
            });
            //console.log(Math.atan2(triangle_y, triangle_x));
            this.rotation = Math.atan2(triangle_y, triangle_x)*180/Math.PI;
        });
        
        
    	this.set({'entity' : skoll });
    	
    }
});