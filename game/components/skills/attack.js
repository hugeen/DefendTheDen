define([
    'underscore',
    'crafty',
    'game/mouse'
], function(_, Crafty, mouse) {
    
    Crafty.c("Attack", {
        init : function() {
            this.addComponent("Bullet, axe, Collision");
            
            this.speed = 15;

            this.attack = function(player) {
                
                var from = {
                    x: player.x,
                    y: player.y
                }
                
                var to = {
                    x: mouse.position.relative.x,
                    y: mouse.position.relative.y
                }
                
                this.origin("center");
                
                this.bind("EnterFrame", function() {
                    this.rotation += 15;
                });
                
                this.fire(from, to, this.speed);
                
            }
            
        }
    });

});