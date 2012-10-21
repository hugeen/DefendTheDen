define(function() {
    var utils = require("game/utils");
    return {
        name: "box2d",
        init: function() {
            
            var bar = Crafty.e("2D, Canvas, Color, Box2D")
        	    .attr({ x: 15, y: 450, w: 15, h:15})
        	    .color("#000")
        	    .box2d({
    				bodyType: 'dynamic',
    				density : 1.0,
    				friction : 10,
    				restitution : 0
    			});
    	    console.log(bar);

    	    applyImpulse = function(body, degrees, power) {
                body.ApplyImpulse(new utils.box2D.Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
                Math.sin(degrees * (Math.PI / 180)) * power),
                body.GetWorldCenter());
            }
            applyImpulse(bar.body, 30, 15);
    	    var deg = 30;
    	    var pow = 7;
    	    Crafty.e("2D, Canvas, Color, Box2D, floor")
                   .attr({ x: 0, y: 570, w: 710, h:4})
                   .color("#000")
                   .box2d({
               		   bodyType: 'static',
               		   density : 1.0,
               		   friction : 10,
               		   restitution : 0
               	    });
            
        }   
    };

});
