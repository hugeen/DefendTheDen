define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Pig", {
        init : function() {
            
            this.addComponent("SpriteAnimation, pig");
            
            this.attr({
                w : 115,
                h : 115,
            });
            
            this.walkSpeed = 5;
            
            this.animate("walk", 0, 0, 3);
            this.animate("walk", 55, -1);
    
            this.walk();
            
        }
    });

});