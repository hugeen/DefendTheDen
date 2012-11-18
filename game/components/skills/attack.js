define([
    'crafty'
], function(Crafty) {
    
    Crafty.c("Attack", {
        init : function() {
            this.addComponent("Bullet, axe, Collision");
            this.speed = 15;

            this.attack = function(from, to) {
                this.origin("center");
                this.bind("EnterFrame", function() {
                    this.rotation += 15;
                });
                this.fire(from, to, this.speed);
            };
            
        }
    });

});