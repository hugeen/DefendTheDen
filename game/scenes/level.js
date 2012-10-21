define(function(require) {
    
    
    var $ = require("jQuery");
    var Crafty = require("Crafty");
    var PlayerEntity = require("game/entities/player");
    var MonsterEntity = require("game/entities/monster");
    
    return {
        name: "level",
        init: function(options) {
            
            var player = PlayerEntity.create();
            
            MonsterEntity.create("Pig");
            Crafty.e("Wires");
            
            $("body").on("click", "#wrapper", function(e) {
                Crafty.e("Attack").attack(player, e);
            });

            /*
            Crafty.e("Skill").initSkill();   
            Crafty.e("Bullet").fire({x: 5, y: 5}, {x: 50, y: 50}, 5);
            */
        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
