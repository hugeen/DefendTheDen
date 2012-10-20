define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Skill", {
        init: function() {
            this.addComponent("Keyboard, Cooldown");
            this.keyBind = "A";
            this.initCooldown(1);
            this.bind("CooldownEnded", function() {
                console.log("end");
            });
            this.bind("CooldownOn", function() {
                
            });
            this.bind("KeyDown", function() {
                this.startCooldown();
            });
            
        }
    });

});
