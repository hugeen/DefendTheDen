define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {

    return {
        create: function(type) {
            
            var monster = Crafty.e("NonPlayableCharacter, "+type)
            monster.attr({x: 300, y: 300});
            return monster;
        }
    };

});
