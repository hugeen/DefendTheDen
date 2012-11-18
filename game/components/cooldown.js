define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Cooldown", {
        init: function() {
            
            var options = {
                value: 1,
                start: 0,
                ready: true,
                initialized: false
            };
            
            this.cooldown = function(value) {
                _.extend(options, {
                   value: value,
                   initialized: true 
                });

                this.bind("EnterFrame", function() {
                    if(!options.ready) {
                        var now = new Date().getTime();
                        var finishAt = options.start+(options.value*1000);
                        if(finishAt > now) {
                            this.trigger("CooldownOn", now, finishAt, options);
                        } else {
                            options.ready = true;
                            this.trigger("CooldownEnded", now, finishAt, options);
                        }
                    }
                });
            };
            
            this.startCooldown = function() {
                if(options.initialized && options.ready) {
                    options.start = new Date().getTime();
                    options.ready = false;
                    this.trigger("CooldownStarted", options);
                    return true;
                } else {
                    this.trigger("CooldownNotReady", options);
                    return false;
                }
            };

        }
    });

});
