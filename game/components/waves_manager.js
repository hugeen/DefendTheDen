define([
    'underscore',
    'crafty',
    'game/utils'
], function(_, Crafty, utils) {
    
    Crafty.c("WavesManager", {
        init: function() {
            
            var manager = this;
            
            Crafty.bind("WaveFinished", function() {
                manager.currentWave++;
                if(manager.currentWave < manager.wavesCount) {
                    manager.next();
                }
            });
            
            this.start = function(waves, speed) {
                _.extend(this, {
                    currentWave: 0,
                    wavesCount: waves.length,
                    waves: waves,
                    speed: speed || 1
                });
                this.next();
            };
            
            this.next = function() {
                Crafty.e("Wave").start(this.waves[this.currentWave], this.speed);
            };
            
        }
    });

});
