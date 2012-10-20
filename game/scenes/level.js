define(function(require) {
    
    var Crafty = require("Crafty");
    var player = require("game/entities/player");
    var monster = require("game/entities/monster");
    return {
        name: "level",
        init: function(options) {
            player.create();
            monster.create("Pig");
            Crafty.e("Skill").initSkill();
            Crafty.e("Wires");
            Crafty.e("Bullet").fire({x: 5, y: 5}, {x: 50, y: 50}, 5);
        }
    };

});
