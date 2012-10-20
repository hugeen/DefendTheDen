define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("PlayerMove", {
        init : function() {
            this.addComponent("Keyboard");
            
            this.movement = {
                north: false,
                south: false
            };
            
            this.bind("KeyDown", function() {
                
                this.movement = {
                    north: this.isDown("Z"),
                    south: this.isDown("S")
                };
                
            });
            
            this.bind("KeyUp", function(key) {
                if(Crafty.keys["Z"] === key.keyCode) {
                    this.movement.north = false;
                }
                if(Crafty.keys["S"] === key.keyCode) {
                    this.movement.south = false;
                }
            });
            
            
            this.bind("EnterFrame", function() {
                if(this.movement.north) {
                    this.move("n", 10);
                }
                if(this.movement.south) {
                    this.move("s", 10);
                }
            });
            
        }
    });

});