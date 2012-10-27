define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("PlayableCharacter", {
        init: function() {
            this.addComponent("Character");
        }
    });

});
