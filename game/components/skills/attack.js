define([
    'Underscore',
    'Crafty',
    'config'
], function(_, Crafty, config) {
    
    Crafty.c("Attack", {
        init : function() {
            this.addComponent("Bullet, axe, Collision");
            
            this.speed = 15;
            
            this.attack = function(player, mouse) {
                
                var from = {
                    x: player.x,
                    y: player.y
                }
                
                var to = {
                    x: mouse.clientX-config.offset.left,
                    y: mouse.clientY-config.offset.top
                }
                
                this.origin("center");
                
                this.bind("EnterFrame", function() {
                    this.rotation += 15;
                });
                
                this.onHit("NonPlayableCharacter", function() {
                    this.destroy();
                });
                
                this.fire(from, to, this.speed);
                
            }
            
        }
    });

});