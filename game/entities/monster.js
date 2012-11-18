define([
    'underscore',
    'crafty'
], function(_, Crafty) {

    return {
        create: function(type, line) {
            var monster = Crafty.e("NonPlayableCharacter, "+type);
            monster.moveToLine(line);
            return monster;
        }
    };

});
