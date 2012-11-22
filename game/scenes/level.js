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
    'text!templates/levels/level.html',
    'game/mouse',
    'mouseTrap'
], function(_, $, Crafty, Burst, PlayerEntity, MonsterEntity, keyboard, skills, _skills, _skill, _level, mouse, Mousetrap) {

    return {
        name: "level",
        init: function(options) {
            
            Crafty.e("WavesManager").start(options.level.get("waves"), options.level.get("speed"));
            
            $("#wrapper").append("<div id='debug'></div>");
            
            $("#wrapper").append(_.template(_skills));
            $("#wrapper").append(_.template(_level, { level: options.level }));
            setTimeout(function() {
                $(".display_warning").remove();
            }, 2000);
            var player = PlayerEntity.create();
            
            skills.each(function(skill) {
                if(skill.get("availableAt") <= options.level.get("id")) {
                    skill.init();
                    var compiledTemplate = _.template(_skill, { skill: skill });
                    $("#skills").append(compiledTemplate);
                }
            });

            Crafty.e("Wires");

            $("body").on("click", "#wrapper", function() {

            });

        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
