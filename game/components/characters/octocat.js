define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Octocat", {
        init : function() {
            this.addComponent("SpriteAnimation, SpriteColor, octocat, Collision");
            
            this.attr({
                w : 90,
                h : 90
            });

            this.collision(new Crafty.polygon([29,17],[23,41],[34,54],[42,75],[61,74],[45,45],[74,25]));
            
            this.walkSpeed = 0.65;
            
            this.animate("walk", 0, 0, 7);
            this.animate("walk", 45, -1);
    
            this.walk();

            this.onHit("Bullet", function(others) {
                others[0].obj.destroy();
                this.takeDamages(50);
                this.git({x: 40, y: 55});
            });
            
            this.bind("Death", function() {
                this.git({x: 40, y: 55});
                this.destroy();
            });
            
        }
    });

});