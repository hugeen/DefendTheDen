define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Pig", {
        init : function() {
            this.addComponent("SpriteAnimation, SpriteColor, pig, Collision");
            
            this.attr({
                w : 115,
                h : 115,
            });

            this.collision(new Crafty.polygon([35,20],[30,40],[40,100],[75,100],[75,40],[35,20]));
            
            this.walkSpeed = 0.45;
            
            this.animate("walk", 0, 0, 3);
            this.animate("walk", 55, -1);
    
            this.walk();

            this.onHit("Bullet", function(others) {
                others[0].obj.destroy();
                this.takeDamages(50);
                this.bleed({x: 40, y: 55});
            });
            
            this.bind("Death", function() {
               this.destroy();
            });
            
        }
    });

});