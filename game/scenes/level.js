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
            var waves = options.level.get("waves");
            Crafty.e("Wave").start(waves[0]);
            /*
            
            function Wave(wave) {
                var timer = false
                var stepsCount = wave[1].length;
                var step = 0;
                var self = this;
                this.start = function() {
                    this.next();
                }
                this.next = function() {
                    setTimeout(function() {
                        _.each(wave, function(line, index) {
                            var symbol = line[step];
                            if(symbol !== "*") {
                                MonsterEntity.create("Octocat", index);
                            }
                        });
                        if(step <= stepsCount) {
                            step++;
                            self.next();
                        }
                    }, 1000);
                }
            }
            var wave = new Wave(waves[0]);
            wave.start();
            */
            $("#wrapper").append(_.template(_skills));
            
            var player = PlayerEntity.create();
            
            skills.each(function(skill) {
                if(skill.get("availableAt") <= options.level.get("id")) {
                    skill.init();
                    var compiledTemplate = _.template(_skill, { skill: skill });
                    $("#skills").append(compiledTemplate);
                }
            });
            
            //var monster = MonsterEntity.create("Octocat", 1);
            //var monster = MonsterEntity.create("Octocat", 3);
            Crafty.e("Wires");

            $("body").on("click", "#wrapper", function() {

            });

        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
