define([
    'underscore',
    'jquery',
    'crafty'
], function(_, $, Crafty) {
    
    Crafty.c("Skill", {
        init: function() {
            this.addComponent("Keyboard, Cooldown");
            
            var options = {};
            
            this.skill = function(custom) {
                _.extend(options, custom);
                this.cooldown(options.cooldown);
            };

            this.bind("CooldownEnded", function() {
                $('#skill_'+options.name).removeClass("skill_on_cooldown");
                this.trigger("SkillReady");
            });
            
            this.bind("CooldownOn", function() {
                $('#skill_'+options.name).addClass("skill_on_cooldown");
                this.trigger("SkillLocked");
            });
            
            this.bind("CooldownStarted", function(cooldown) {
                this.trigger("SkillTriggered");
            });

            this.bind("SkillCastingAttempt", function() {
                this.startCooldown();
            });

            this.bind('KeyDown', function(e) {
                if(e.key == Crafty.keys[options.key]) {
                    $('#skill_'+options.name).addClass("skill_active");
                    this.trigger("SkillCastingAttempt");
                }
            });
            
            this.bind('KeyUp', function(e) {
                if(e.key == Crafty.keys[options.key]) {
                    $('#skill_'+options.name).removeClass("skill_active");
                }
            });
            
        }
    });

});
