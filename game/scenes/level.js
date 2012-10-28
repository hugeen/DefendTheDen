define([
    "jquery",
    "crafty",
    "burst",
    "game/entities/player",
    "game/entities/monster",
    "game/entities/attack",
], function($, Crafty, Burst, PlayerEntity, MonsterEntity, AttackEntity) {

    return {
        name: "level",
        init: function(options) {
            
            var player = PlayerEntity.create();
            
            var monster = MonsterEntity.create("Octocat", 1);
            var monster = MonsterEntity.create("Octocat", 3);
            Crafty.e("Wires");
            
            $("body").on("click", "#wrapper", function() {
                AttackEntity.create(player);
            });
            
            var attackSkill = Crafty.e("Skill");
            attackSkill.initSkill({ key: "D", cooldown: 0.5 }); 
            attackSkill.bind("SkillTriggered", function() {
                AttackEntity.create(player);
            });

            
            
        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
