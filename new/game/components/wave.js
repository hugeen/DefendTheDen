define([
    'underscore',
    'jquery',
    'crafty',
    'game/utils',
    'game/entities/monster'
], function(_, $, Crafty, utils, Monster) {
    
    Crafty.c("Wave", {
        init: function() {
            
            this.addComponent("Delay");
            
            this.start = function(wavesManager, waveLines, speed) {
                _.extend(this, {
                    wavesManager: wavesManager,
                    waveLines: waveLines,
                    steps: waveLines[1].length,
                    step: 0,
                    killedMonsters: 0,
                    speed: speed || 1
                });

                this.monstersCount = (function(waveLines) {
                    var count = 0
                    _.each(waveLines, function(line, lineNumber) {
                        for(var i = 0; i < line.length; i++) {
                            var monsterCode = line[i];
                            if(monsterCode !== "*") {
                                count++;
                            }
                        }
                    });
                    return count;
                })(this.waveLines);
                this.next();
            };
            
            this.killMonster = function() {
                this.killedMonsters++;
                if(this.killedMonsters >= this.monstersCount) {
                    this.delay(function() {
                        this.wavesManager.onWaveFinished();
                    }, 1000/this.speed);
                }
            };
            
            this.next = function() {
                
                _.each(this.waveLines, function(line, lineNumber) {
                    var monsterCode = line[this.step];
                    if(monsterCode !== "*") {
                        Monster.create(utils.entityParser(monsterCode), lineNumber, this);
                    }
                }, this);
                
                this.step++;
                
                if(this.step < this.steps) {
                    this.delay(function() {
                        this.next();
                    }, 1000/this.speed);
                }

            };
            
        }
    });

});
