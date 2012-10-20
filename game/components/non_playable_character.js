define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("NonPlayableCharacter", {
        init: function() {
            this.addComponent("Character");
        }
    });

});
