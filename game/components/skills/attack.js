define([
    'crafty'
], function(Crafty) {
    
    Crafty.c("Attack", {
        init : function() {
            this.addComponent("Bullet, fork, Collision");
            this.speed = 15;
            
            this.collision(new Crafty.polygon([8,14],[67,14],[67,5],[91,5],[91,24],[67,24],[67,20],[8,20]));
            
            this.cast = function(from, to, damages) {
                this.damages = Math.round(Crafty.math.randomNumber(damages.min, damages.max));
                this.fire(from, to, this.speed);
            };
            
        }
    });

});