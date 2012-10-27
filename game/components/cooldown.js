define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Cooldown", {
        init: function() {
            
            var cooldown = {
                value: 1,
                start: 0,
                ready: true,
                initialized: false
            };
            
            this.initCooldown = function(value) {
                cooldown.value = value;
                cooldown.initialized = true;
                this.bind("EnterFrame", function() {
                    if(!cooldown.ready) {
                        var now = new Date().getTime();
                        var finishAt = cooldown.start+(cooldown.value*1000);
                        if(finishAt > now) {
                            this.trigger("CooldownOn", now, finishAt, cooldown);
                        } else {
                            cooldown.ready = true;
                            this.trigger("CooldownEnded", now, finishAt, cooldown);
                        }
                    }
                });
            };
            
            this.startCooldown = function() {
                if(cooldown.initialized && cooldown.ready) {
                    cooldown.start = new Date().getTime();
                    cooldown.ready = false;
                    this.trigger("CooldownStarted", cooldown);
                    return true;
                } else {
                    this.trigger("CooldownNotReady", cooldown);
                    return false;
                }
            };

        }
    });

});
