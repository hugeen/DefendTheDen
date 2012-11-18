define([
    "jquery",
    "crafty",
    "burst",
    "game/entities/player",
    "game/entities/monster",
    'game/keyboard',
    'collections/skills',
    'text!templates/game_ui/skills.html',
    'text!templates/game_ui/skill.html',
    'game/mouse',
    'mouseTrap'
], function($, Crafty, Burst, PlayerEntity, MonsterEntity, keyboard, skills, _skills, _skill, mouse, Mousetrap) {

    return {
        name: "level",
        init: function(options) {
            
            $("#wrapper").append(_.template(_skills));
            
            var player = PlayerEntity.create();
            
            skills.each(function(skill) {
                var keybind = skill.keybind();
                Mousetrap.bind(keybind, function() {
                    skill.get("cast")({
                        x: player.x,
                        y: player.y
                    }, {
                        x: mouse.position.relative.x,
                        y: mouse.position.relative.y
                    });
                });
                
                var compiledTemplate = _.template(_skill, {
                    key: keybind,
                    backgroundPosition: skill.get("backgroundPosition")
                });
                
                $("#skills").append(compiledTemplate);
                
            });
            
            
            
            //var monster = MonsterEntity.create("Octocat", 1);
            //var monster = MonsterEntity.create("Octocat", 3);
            Crafty.e("Wires");
            
            var attackSkill = Crafty.e("Skill");
            attackSkill.skill({ cooldown: 0.5 }); 
            attackSkill.bind("SkillTriggered", function() {
                Crafty.e("Attack").attack({
                    x: player.x,
                    y: player.y
                }, {
                    x: mouse.position.relative.x,
                    y: mouse.position.relative.y
                });
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
