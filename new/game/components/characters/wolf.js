define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Wolf", {
        init : function() {

            this.addComponent("SpriteAnimation, wolf, Collision");
            
            this.attr({
                x : -24,
                y : 90,
                w : 135,
                h : 135,
                z : 17
            });
            
            this.collision(new Crafty.polygon([80,20],[50,40],[40,115],[75,105],[85,40],[100,45],[80,20]));
            
            this.animate("walkWolf", 0, 0, 1);
            this.animate("throwAxe", 1, 0, 3);
            this.animate("blow", 4, 0, 7);
            
            var wagon = Crafty.e("Wagon");
            wagon.attr({ x: this._x+20, y: this._y+50 })
            
            this.attach(wagon);
    
        }
    });

});
