define([
    'underscore',
    'crafty',
    'game/utils',
    'game/entities/monster'
], function(_, Crafty, utils, Monster) {
    
    Crafty.c("Wave", {
        init: function() {
            
            this.addComponent("Delay");
            
            this.start = function(waveLines, speed) {
                _.extend(this, {
                    waveLines: waveLines,
                    steps: waveLines[1].length,
                    step: 0,
                    speed: speed || 1
                });
                this.next();
            };
            
            this.next = function() {
                
                _.each(this.waveLines, function(line, lineNumber) {
                    var monsterCode = line[this.step];
                    if(monsterCode !== "*") {
                        Monster.create(utils.entityParser(monsterCode), lineNumber);
                    }
                }, this);
                
                this.step++;
                
                if(this.step < this.steps) {
                    this.delay(function() {
                        this.next();
                    }, 1000/this.speed);
                } else {
                    Crafty.trigger("WaveFinished");
                }

            };
            
        }
    });

});
