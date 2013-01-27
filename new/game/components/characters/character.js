define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Character", {
        init: function() {
            this.addComponent("2D, Canvas, Life");
            this.bleed = function(_padding, _angle) {
                var padding = _padding || { x: 0, y: 0 };
                var angle = _angle || 55;
                Crafty.e("Blood").spawnAt({ x: this.x+padding.x, y: this.y+padding.y }, angle);
            };
            
            this.git = function(_padding, _angle) {
                var padding = _padding || { x: 0, y: 0 };
                var angle = _angle || 55;
                Crafty.e("Git").spawnAt({ x: this.x+padding.x, y: this.y+padding.y });
            }
        }
    });

});
