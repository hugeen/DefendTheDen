define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Wolf", {
        init : function() {

            this.addComponent("SpriteAnimation, wolf");
            
            this.attr({
                x : 0,
                y : 90,
                w : 135,
                h : 135,
                z : 17
            });
    
            this.animate("walkWolf", 0, 0, 1);
            this.animate("throwAxe", 1, 0, 3);
            this.animate("blow", 4, 0, 7);
    
        }
    });

});
