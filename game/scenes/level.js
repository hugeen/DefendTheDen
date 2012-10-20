define(function(require) {
    
    var Crafty = require("Crafty");
    var player = require("game/entities/player");
    var monster = require("game/entities/monster");
    return {
        name: "level",
        init: function(options) {
            player.create();
            monster.create("Pig");
        }
    };

});
