define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Pig", {
        init : function() {

            this.addComponent("2D, Canvas, SpriteAnimation, pig");
            
            this.attr({
                x : -150,
                y : -90,
                w : 115,
                h : 115,
            });
            this._mainComponentAttr = {
                x : 30,
                y : 20
            };
            this.animate("walk", 0, 0, 3);
            this.animate("walk", 38, -1);
    
        }
    });

});