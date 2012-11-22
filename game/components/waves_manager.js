define([
    'underscore',
    'crafty',
    'game/utils'
], function(_, Crafty, utils) {
    
    Crafty.c("WavesManager", {
        init: function() {
            
            this.onWaveFinished = function() {
                this.currentWave++;

                if(this.currentWave < this.wavesCount) {
                    this.next();
                } else {
                    alert("stage clear");
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
