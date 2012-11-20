define([
    "underscore",
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
], function(_, $, Crafty, Burst, PlayerEntity, MonsterEntity, keyboard, skills, _skills, _skill, mouse, Mousetrap) {

    return {
        name: "level",
        init: function(options) {            
            
            $("#wrapper").append(_.template(_skills));
            
            var player = PlayerEntity.create();
            
            skills.each(function(skill) {
                if(skill.get("availableAt") <= options.level) {
                    skill.init();
                    var compiledTemplate = _.template(_skill, { skill: skill });
                    $("#skills").append(compiledTemplate);
                }
            });
            
            var monster = MonsterEntity.create("Octocat", 1);
            var monster = MonsterEntity.create("Octocat", 3);
            Crafty.e("Wires");

            $("body").on("click", "#wrapper", function() {

            });

        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
