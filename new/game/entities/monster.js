define([
    'underscore',
    'crafty'
], function(_, Crafty) {

    return {
        create: function(type, line, wave) {
            var monster = Crafty.e("NonPlayableCharacter, "+type);
            monster.moveToLine(line);
            if(typeof wave !== "undefined") {
                monster.bind("Death", function() {
                    wave.killMonster();
                });
            }
            return monster;
        }
    };

});
