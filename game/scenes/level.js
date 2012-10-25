define([
    "jQuery",
    "Crafty",
    "game/entities/player",
    "game/entities/monster"
], function($, Crafty, PlayerEntity, MonsterEntity) {
    
    return {
        name: "level",
        init: function(options) {
            
            var player = PlayerEntity.create();
            
            MonsterEntity.create("Pig");
            Crafty.e("Wires");
            
            $("body").on("click", "#wrapper", function(e) {
                Crafty.e("Attack").attack(player, e);
            });
            
            var attackSkill = Crafty.e("Skill");
            attackSkill.initSkill(); 
            attackSkill.bind("SkillTriggered", function() {
                Crafty.e("Attack").attack(player);
            });

        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
