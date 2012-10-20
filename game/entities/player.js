define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {

    return {
        create: function() {
            
            var player = Crafty.e("PlayableCharacter, PlayerMove, Wolf")
            
            return player;
        }
    };

});
