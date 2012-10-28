define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    Crafty.c("Wires", {
        init : function() {
            
            this.addComponent("2D, Canvas, Sprite, wires, Collision");
            
            this.attr({
                w : 42,
                h : 420,
                x : 70,
                y : 85,
                z : 16
            });
            
            this.collision(new Crafty.polygon([0,0],[0,410],[30,410],[30,0]));
            this.onHit("NonPlayableCharacter", function(entities) {
                _.each(entities, function(entity) {
                    entity.obj.trigger("Death");
                });
            });
            
        }
    });

});

