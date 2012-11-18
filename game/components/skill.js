define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Skill", {
        init: function() {
            this.addComponent("Keyboard, Cooldown");
            
            var options = {
                key: "A",
                cooldown: 1
            };
            
            this.skill = function(custom) {
                _.extend(options, custom);
                this.cooldown(options.cooldown);
            };

            this.bind("CooldownEnded", function() {
                this.trigger("SkillReady");
            });
            
            this.bind("CooldownOn", function() {
                this.trigger("SkillLocked");
            });
            
            this.bind("CooldownStarted", function(cooldown) {
                this.trigger("SkillTriggered");
            });

            this.bind("SkillCastingAttempt", function() {
                this.startCooldown();
            });
            
        }
    });

});
