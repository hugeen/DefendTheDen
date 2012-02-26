function loadScene(scene) {
    switch(scene) {
        case 1:
            resetStorage();
            sceneMaker();
            break;
        case "loose":
            loadScene(storage.level.get());
            break;
        default:
            Crafty.scene("skillShop");
            break;
    }
};

function loadLevel(level) {
    DTD.player = Crafty.e("Wolf");
    DTD.skills = [];
    DTD.skills["throwingAxeSkill"] = throwingAxeSkill();
    DTD.selectedSkill == "ThrowingAxeSkill";
    if(!level) {
        $("#progressBar .empty, #progressBar, #progressBarBelow").remove();
        $("body").append("<div id='endlessInGameScore' class='battleFieldUI'>0</div>")
        DTD.skills["blowSkill"] = blowSkill();
        DTD.skills["rockSkill"] = rockSkill();
        Crafty.e("Endless");
    } else {
        if(level > 1) {
            DTD.skills["blowSkill"] = blowSkill();
        }
        if(level > 3) {
            DTD.skills["rockSkill"] = rockSkill();
        }
        var round = Crafty.e("Round");
        round.create(level);
    }
};

function youWin() {
    $("body").append('<div class="youWin">You WIN !</div>');
};

function youLoose() {
    $("body").append('<div class="youWin">You LOOSE !</div>');
};

function Round() {
    this.waves = [];
    this.lastWaveAt = 0;
}

Round.prototype.addWave = function(wave, at) {
    this.lastWaveAt += at;
    this.waves.push({
        wave : wave,
        at : this.lastWaveAt
    });
};
var rounds = [];
rounds[1] = new Round();
rounds[1].addWave("!p!!p!", 1);
rounds[1].addWave("!!!p!!", 5);
rounds[1].addWave("!p!p!!", 3);
rounds[1].addWave("p!!!p!", 5);
rounds[1].addWave("!p!p!!", 5);
rounds[1].addWave("!!p!!!", 3);
rounds[1].addWave("!!!!!p", 3);

rounds[2] = new Round();
rounds[2].addWave("!!p!p!", 1);
rounds[2].addWave("!p!p!!", 4.5);
rounds[2].addWave("!p!p!p", 4.5);
rounds[2].addWave("p!!!p!", 6);
rounds[2].addWave("p!p!p!", 4.5);
rounds[2].addWave("p!!!p!", 6);
rounds[2].addWave("pp!!pp", 4.5);

rounds[3] = new Round();
rounds[3].addWave("!!!!!r", 1);
rounds[3].addWave("!!!!r!", 1.5);
rounds[3].addWave("!!!r!!", 1.5);
rounds[3].addWave("!!r!!!", 1.5);
rounds[3].addWave("!r!!!!", 1.5);
rounds[3].addWave("r!!!!!", 1.5);
rounds[3].addWave("p!!!!r", 1.5);
rounds[3].addWave("p!!!!r", 3.5);
rounds[3].addWave("!p!!r!", 3.5);
rounds[3].addWave("!!pr!!", 3.5);
rounds[3].addWave("prprpr", 3.5);

rounds[4] = new Round();
rounds[4].addWave("!!!!!r", 1);
rounds[4].addWave("p!!!!r", 3);
rounds[4].addWave("!p!!r!", 3);
rounds[4].addWave("!!pr!!", 3);
rounds[4].addWave("p!!!!r", 3.5);
rounds[4].addWave("!p!!r!", 3);
rounds[4].addWave("!!pr!!", 3);
rounds[4].addWave("prprpr", 3);
rounds[4].addWave("p!!!!r", 8);
rounds[4].addWave("!p!!r!", 3.5);
rounds[4].addWave("!!pr!!", 3);
rounds[4].addWave("p!!!!r", 3.5);
rounds[4].addWave("!p!!r!", 3);
rounds[4].addWave("!!pr!!", 3);

rounds[5] = new Round();
rounds[5].addWave("!!!g!!", 1);
rounds[5].addWave("!p!!p!", 7);
rounds[5].addWave("!!r!!!", 3);
rounds[5].addWave("!p!!!!", 1.5);
rounds[5].addWave("!!!!r!", 1.5);
rounds[5].addWave("!r!!!p", 4.5);
rounds[5].addWave("!!!r!p", 4.5);
rounds[5].addWave("p!!!p!", 4.5);
rounds[5].addWave("pppppp", 4);
rounds[5].addWave("prpprp", 8);
rounds[5].addWave("!!!!g!", 8);

rounds[6] = new Round();
rounds[6].addWave("!!g!!!", 1);
rounds[6].addWave("!r!!r!", 4);
rounds[6].addWave("p!!!!p", 3);
rounds[6].addWave("!r!r!r", 6);
rounds[6].addWave("p!p!p!", 5);
rounds[6].addWave("!r!p!r", 6);
rounds[6].addWave("!p!!!p", 5);
rounds[6].addWave("!!rp!r", 3);
rounds[6].addWave("!!rr!!", 6);
rounds[6].addWave("p!!!!p", 3);
rounds[6].addWave("!pppp!", 3);
rounds[6].addWave("!g!!g!", 6);
rounds[6].addWave("!!!r!!", 9);
rounds[6].addWave("!!g!!!", 2);
rounds[6].addWave("!!!!!p", 7);

rounds[7] = new Round();
rounds[7].addWave("!r!p!r", 1);
rounds[7].addWave("!p!!!p", 7);
rounds[7].addWave("!r!r!r", 3);
rounds[7].addWave("!g!!g!", 7);
rounds[7].addWave("!!g!!!", 9);
rounds[7].addWave("p!!!!p", 6);
rounds[7].addWave("!r!!r!", 3);
rounds[7].addWave("!g!p!g", 3);
rounds[7].addWave("!!rr!!", 9);
rounds[7].addWave("!!!r!!", 2);
rounds[7].addWave("!pppp!", 1);
rounds[7].addWave("!!g!!!", 7);
rounds[7].addWave("!r!r!r", 4);
rounds[7].addWave("!p!!!p", 6);
rounds[7].addWave("p!p!p!", 3);
rounds[7].addWave("!!!r!!", 7);
rounds[7].addWave("!pppp!", 3);
rounds[7].addWave("p!p!p!", 7);

var currentRound = false;
Crafty.c("Round", {
    init : function() {
        currentRound = this;
        this.addComponent("RealDelay");
        this._start = 0;
        this.waves = [];
        this._monsterCount = 0;
        this._monstersDied = 0;
        this._played = false;
        this._roundPauseBuffer = 0;
        this._roundPause = 0;
        this.bind("Pause", function() {
            this._roundPauseBuffer = new Date().getTime();
        });
        this.bind("Unpause", function() {
            this._roundPause += (new Date().getTime()) - this._roundPauseBuffer;
        });
        this.bind("EnterFrame", function() {

            if(this._played) {
                var now = parseInt(new Date().getTime(), 10);
                var start = this._startAt;

                if(this._endAt + 1000 + this._roundPause > now) {
                    var self = this;
                    _.each(this.waves, function(item, key) {
                        if((item.at * 1000) + self._roundPause < now - start) {
                            if(!item.played) {
                                item.played = true;
                                var wave = waveParser(item.wave);
                                for( i = 0; i < 6; i++) {
                                    if(wave[i] != "Nobody") {
                                        var newEnemy = Crafty.e(wave[i]);
                                        newEnemy.setToLine(i + 1);
                                        newEnemy.attachSprite(Crafty.e(wave[i] + "Sprite"));
                                    }
                                }
                            }
                        }
                    });
                } else {
                    if(this._monsterCount == this._monstersDied) {
                        this._played = false;
                        this.trigger("Ended");
                        youWin();
                        this.delay(function() {
                            $(".youWin").remove();
                            removeUI();
                            if(storage.level.get() > 6) {
                                storage.level.set(1);
                                storage.endless.set(true);
                                Crafty.scene("credits");
                            } else {
                                storage.level.set(storage.level.get() + 1);
                                loadScene(storage.level.get());
                            }
                        }, 2000);
                    }
                }
            };
        });
    },
    create : function(level) {
        this._roundId = level;
        var that = this;
        _.each(rounds[level].waves, function(item, key) {
            that.addWave(item.wave, item.at)
        });
        this.play();
    },
    addWave : function(wave, at) {
        this.waves.push({
            wave : wave,
            at : at,
            played : false
        });
    },
    play : function() {
        var that = this;
        var lastWave = _.last(this.waves);
        this._monsterCount = monsterCount(this.waves);
        this._monstersDied = 0;
        this._played = true;
        this._duration = lastWave.at * 1000;
        this._startAt = parseInt(new Date().getTime(), 10);
        this._endAt = this._startAt + this._duration;
        for(var i = 1; i <= 20; i++) {
            this.realDelay(function() {
                $("#progressBar .empty").last().removeClass("empty").addClass("full");
            }, (this._duration / 20) * i);
        }
        $("#levelNumber span").html(this._roundId);
    }
});

Crafty.c("Endless", {
    init : function() {
        currentRound = this;
        this._score = 0;
        this.addComponent("RealDelay");
        this.pigChance = 101;
        this.riddingChance = 101;
        this.lastEnemy = 1;
        this.nextTimeout = 3250;
        $("#levelNumber").html("Endless !");
        this.upgradeDifficulty();
        this.generateMonster();
        this.bind("EnterFrame", function() {
            if(!DTD.inGame) {
                this.detroy();
            }
        });
    },
    score : function(score) {
        this._score += score;
        $("#endlessInGameScore").html(this._score);
    },
    upgradeDifficulty : function() {
        if(this.pigChance >= 50) {
            this.pigChance--;
        } else {
            if(this.riddingChance >= 75) {
                this.riddingChance--;
            }
        }
        if(this.nextTimeout >= 750) {
            this.nextTimeout -= 10;
        }
        this.realDelay(function() {
            this.upgradeDifficulty();
        }, 3000);
    },
    generateMonster : function() {
        if(DTD.gameType == "endless") {

            if(rolling(this.pigChance)) {
                var newEnemy = Crafty.e("Pig");
                newEnemy.setToLine(Crafty.math.randomInt(1, 6));
                newEnemy.attachSprite(Crafty.e("PigSprite"));
            } else if(rolling(this.riddingChance)) {
                var newEnemy = Crafty.e("Ridding");
                newEnemy.setToLine(Crafty.math.randomInt(1, 6));
                newEnemy.attachSprite(Crafty.e("RiddingSprite"));
            } else {
                var newEnemy = Crafty.e("Granny");
                newEnemy.setToLine(Crafty.math.randomInt(1, 6));
                newEnemy.attachSprite(Crafty.e("GrannySprite"));
            }

            this.realDelay(function() {
                this.generateMonster();
            }, this.nextTimeout);

        } else {
            this.destroy();
        }

    }
});
