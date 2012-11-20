define([
    'underscore',
    'crafty',
    'game/utils'
], function(_, Crafty, utils) {
    
    Crafty.c("WavesManager", {
        init: function() {
            
            this.start = function(waves) {
                Crafty.e("Wave").start(waves[0]);
            };
            
            
        }
    });

});
