define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {

    return {
        create: function(type) {
            
            var monster = Crafty.e("NonPlayableCharacter, "+type);
            monster.moveToLine(2);
            return monster;
        }
    };

});
