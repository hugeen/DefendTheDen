define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {

    return {
        create: function() {
            return Crafty.e("PlayableCharacter");
        }
    };

});
