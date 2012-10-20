define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Skill", {
        init: function() {
            this.addComponent("Keyboard, Cooldown");
            
            var options = {
                key: "A",
                cooldown: 1
            };

            this.initSkill = function(_options) {
                _.extend(options, _options);
                this.initCooldown(options.cooldown);
            };

            this.bind("CooldownEnded", function() {
                console.log("end");
            });
            this.bind("CooldownOn", function() {
                
            });
            this.bind("KeyDown", function() {
                if(this.isDown(options.key)) {
                    this.startCooldown();
                }
            });
            
        }
    });

});
