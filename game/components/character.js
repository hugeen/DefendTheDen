define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Character", {
        init: function() {
            this.addComponent("2D, Canvas");
        }
    });

});
