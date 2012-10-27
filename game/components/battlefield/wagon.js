define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Wagon", {
        init : function() {
            
            this.addComponent("2D, Canvas, Sprite, wagon");
            
            this.attr({
                w : 81,
                h : 81,
                x : 0,
                y : 0,
                z : 13
            });
            
            this.attachToPlayer = function() {
                
            }
            
            this.bind("EnterFrame", function() {
                
            });
        }
    });

});


