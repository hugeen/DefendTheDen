define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    var player;
    
    return {
        create: function() {
            player = Crafty.e("PlayableCharacter, PlayerMove, Wolf");
            return player;
        },
        get: function() {
            return player;
        }
    };

});
