define(function(require) {
    
    var Crafty = require("Crafty");
    var PlayerEntity = require("game/entities/player");
    var MonsterEntity = require("game/entities/monster");
    return {
        name: "level",
        init: function(options) {
            
            var player = PlayerEntity.create();
            var monster = MonsterEntity.create("Pig");
            Crafty.e("Wires");
            /*
            Crafty.e("Skill").initSkill();   
            Crafty.e("Bullet").fire({x: 5, y: 5}, {x: 50, y: 50}, 5);
            */
        }
    };

});
