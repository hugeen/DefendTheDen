define([
    'underscore',
    'crafty',
    'game/utils',
    'router'
], function(_, Crafty, utils, router) {
    
    Crafty.c("WavesManager", {
        init: function() {
            
            this.onWaveFinished = function() {
                this.currentWave++;

                if(this.currentWave < this.wavesCount) {
                    this.next();
                } else {
                    router.go("levels/1");
                }
            }
            
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
                Crafty.e("Wave").start(this, this.waves[this.currentWave], this.speed);
            };
            
        }
    });

});
