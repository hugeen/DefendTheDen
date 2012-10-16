define([
    'jQuery',
    'Underscore',
    'Backbone',
    'Crafty'
], function($, _, Backbone, Crafty) {
    
    return {
        spawnEntity: function() {
            Crafty.e("2D, Canvas, SpriteAnimation, wolf").attr({
                x : 0,
                y : 0,
                w : 135,
                h : 135,
                z : 1
            });
        }
    };

});
