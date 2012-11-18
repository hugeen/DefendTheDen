define([
    "jquery",
    "crafty",
    "burst",
    "game/entities/player",
    "game/entities/monster",
    "game/entities/attack",
    'game/keyboard',
    'collections/skills',
    'text!templates/game_ui/skills.html',
    'text!templates/game_ui/skill.html',
    'mouseTrap'
], function($, Crafty, Burst, PlayerEntity, MonsterEntity, AttackEntity, keyboard, skills, _skills, _skill, Mousetrap) {

    return {
        name: "level",
        init: function(options) {
            
            $("#wrapper").append(_.template(_skills));

            skills.each(function(skill) {
                var keybind = keyboard.keybinds.AZERTY[skill.get("name")]
                
                Mousetrap.bind(keybind, function() {
                    console.log(skill.get("name"));
                });
                
                var compiledTemplate = _.template(_skill, {
                    key: keybind,
                    backgroundPosition: skill.get("backgroundPosition")
                });
                
                $("#skills").append(compiledTemplate);
                
            });
            
            var player = PlayerEntity.create();
            
            //var monster = MonsterEntity.create("Octocat", 1);
            //var monster = MonsterEntity.create("Octocat", 3);
            Crafty.e("Wires");
            
            var attackSkill = Crafty.e("Skill");
            attackSkill.skill({ cooldown: 0.5 }); 
            attackSkill.bind("SkillTriggered", function() {
                AttackEntity.create(player);
            });
            
            $("body").on("click", "#wrapper", function() {
                attackSkill.trigger("SkillCastingAttempt");
            });

        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
