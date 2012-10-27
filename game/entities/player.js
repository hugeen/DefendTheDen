define([
    'underscore',
    'crafty'
], function(_, Crafty) {

    return {
        create: function() {
            
            var player = Crafty.e("PlayableCharacter, PlayerMove, Wolf")
            
            return player;
        }
    };

});
