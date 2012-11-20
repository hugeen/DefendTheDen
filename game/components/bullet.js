define([
    'underscore',
    'crafty',
    'game/utils'
], function(_, Crafty, utils) {
    
    Crafty.c("Bullet", {
        init: function() {
            
            this.addComponent("2D, Canvas");
            
            this.attr({
                w: 20,
                h: 20,
                x: -1000,
                y: -1000
            })

            this.fire = function(startCoords, directionCoords, speed) {
                
                var radian = Math.atan2(directionCoords.y-startCoords.y, directionCoords.x-startCoords.x);
                var vel = {
                    x: Math.cos(radian) * speed,
                    y: Math.sin(radian) * speed
                };
                
                this.origin("center");
                this.rotation = Crafty.math.radToDeg(radian);

                this.attr(startCoords);
                
                this.bind("EnterFrame", function() {

                    this.attr({
                        x: this._x + vel.x,
                        y: this._y + vel.y
                    });
                    if(utils.outOfBounds(this)) {
                        this.destroy();
                    }
                    
                });

            }
            
        }
    });

});
