define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("PlayableCharacter", {
        init: function() {
            this.addComponent("Character");
        }
    });

});
