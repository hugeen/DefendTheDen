define([
    'underscore',
    'crafty',
    'game/utils'
], function(_, Crafty, utils) {
    
    Crafty.c("Pig", {
        init : function() {
            this.addComponent("SpriteAnimation, SpriteColor, pig, Collision");
            
            this.attr({
                w : 115,
                h : 115,
            });
            
            this.life = 225;

            this.collision(new Crafty.polygon([35,20],[30,40],[40,100],[75,100],[75,40],[35,20]));
            
            this.walkSpeed = 0.45;
            
            this.animate("walk", 0, 0, 3);
            this.animate("walk", 55, -1);
    
            this.walk();

            this.onHit("Bullet", function(others) {
                var bullet = others[0].obj;
                var damages = bullet.damages;
                bullet.destroy();
                this.bleed({x: 40, y: 55});
                utils.takeDamages(this, damages);
            });
            
            this.bind("Death", function() {
               this.destroy();
            });
            
        }
    });

});