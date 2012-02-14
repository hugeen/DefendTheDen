var loadScene = function(scene) {
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
var loadLevel = function(level) {
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
        rounds[level]();
    }
};
var youWin = function() {
    $("body").append('<div class="youWin">You WIN !</div>');
};
var youLoose = function() {
    $("body").append('<div class="youWin">You LOOSE !</div>');
};
var currentRound;
Crafty.c("Round", {
    init : function() {
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
                            storage.level.set(storage.level.get() + 1);
                            loadScene(storage.level.get());
                        }, 2000);
                    }
                }
            };
            currentRound = this;
        });
    },
    create : function(id) {
        this._roundId = id;
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
        this._score = 0;
        this.addComponent("RealDelay");
        this.pigChance = 101;
        this.riddingChance = 101;
        this.lastEnemy = 1;
        this.nextTimeout = 3250;
        currentRound = this;
        $("#levelNumber").html("Endless !");
        this.upgradeDifficulty();
        this.generateMonster();
    },
    score: function(score) {
        this._score += score;
        $("#endlessInGameScore").html(this._score);
    },
    upgradeDifficulty: function() {
        if(this.pigChance >= 50) {
            console.log("pigChance>"+this.pigChance);
            this.pigChance--;
        } else {
            if(this.riddingChance >= 75) {
                console.log("riddingChance>"+this.riddingChance);
                this.riddingChance--;
            }
        }
        if(this.nextTimeout >= 750) {
            console.log(">>>>>"+this.nextTimeout);
            this.nextTimeout -= 10;
        }
        this.realDelay(function() {
            this.upgradeDifficulty();
        },3000);
    },
    generateMonster: function() {
        if(rolling(this.pigChance)) {
            var newEnemy = Crafty.e("Pig");
            newEnemy.setToLine(Crafty.math.randomInt(1,6));
            newEnemy.attachSprite(Crafty.e("PigSprite"));
        } else if(rolling(this.riddingChance)) {
            var newEnemy = Crafty.e("Ridding");
            newEnemy.setToLine(Crafty.math.randomInt(1,6));
            newEnemy.attachSprite(Crafty.e("RiddingSprite"));
        } else {
            var newEnemy = Crafty.e("Granny");
            newEnemy.setToLine(Crafty.math.randomInt(1,6));
            newEnemy.attachSprite(Crafty.e("GrannySprite"));
        }
        this.realDelay(function() {
            this.generateMonster();
        },this.nextTimeout);
    }
});

var rounds = [];
rounds[1] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(1);
    round.addWave("!p!!p!", lastWave++);
    round.addWave("!!!p!!", lastWave += 3);
    round.addWave("!p!p!!", lastWave += 3);
    round.addWave("p!!!p!", lastWave += 4);
    round.addWave("!p!p!!", lastWave += 4);
    round.addWave("!!p!!!", lastWave += 2);
    round.addWave("!!!!!p", lastWave += 1);
    round.play();
    return round;
};
rounds[2] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(2);
    round.addWave("!!p!p!", lastWave++);
    round.addWave("!p!p!!", lastWave += 4);
    round.addWave("!p!p!p", lastWave += 4);
    round.addWave("p!!!p!", lastWave += 6);
    round.addWave("p!p!p!", lastWave += 4);
    round.addWave("p!!!p!", lastWave += 6);
    round.addWave("pp!!pp", lastWave += 4);
    round.play();
    return round;
};
rounds[3] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(3);
    round.addWave("!!!!!r", lastWave++);
    round.addWave("!!!!r!", lastWave += 1.5);
    round.addWave("!!!r!!", lastWave += 1.5);
    round.addWave("!!r!!!", lastWave += 1.5);
    round.addWave("!r!!!!", lastWave += 1.5);
    round.addWave("r!!!!!", lastWave += 1.5);
    round.addWave("p!!!!r", lastWave += 1.5);
    round.addWave("p!!!!r", lastWave += 3);
    round.addWave("!p!!r!", lastWave += 3);
    round.addWave("!!pr!!", lastWave += 3);
    round.addWave("prprpr", lastWave += 3);
    round.play();
    return round;
};
rounds[4] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(3);
    round.addWave("!!!!!r", lastWave++);
    round.addWave("p!!!!r", lastWave += 3);
    round.addWave("!p!!r!", lastWave += 3);
    round.addWave("!!pr!!", lastWave += 3);
    round.addWave("p!!!!r", lastWave += 3);
    round.addWave("!p!!r!", lastWave += 3);
    round.addWave("!!pr!!", lastWave += 3);
    round.addWave("prprpr", lastWave += 3);
    round.addWave("p!!!!r", lastWave += 6);
    round.addWave("!p!!r!", lastWave += 3);
    round.addWave("!!pr!!", lastWave += 3);
    round.addWave("p!!!!r", lastWave += 3);
    round.addWave("!p!!r!", lastWave += 3);
    round.addWave("!!pr!!", lastWave += 3);
    round.play();
    return round;
};
rounds[5] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(5);
    round.addWave("!!!g!!", 1);
    round.addWave("!p!!p!", lastWave += 7);
    round.addWave("!!r!!!", lastWave += 3);
    round.addWave("!p!!!!", lastWave += 1.5);
    round.addWave("!!!!r!", lastWave += 1.5);
    round.addWave("!r!!!p", lastWave += 1.5);
    round.addWave("!!!r!p", lastWave += 1.5);
    round.addWave("p!!!p!", lastWave += 3);
    round.addWave("pppppp", lastWave += 3);
    round.addWave("prpprp", lastWave += 7);
    round.addWave("!!!!g!", lastWave += 7);
    round.play();
    return round;
};

rounds[6] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(6);
    round.addWave("!!g!!!", 1);
    round.addWave("!r!!r!", lastWave += 4);
    round.addWave("p!!!!p", lastWave += 3);
    round.addWave("!r!r!r", lastWave += 3);
    round.addWave("p!p!p!", lastWave += 5);
    round.addWave("!r!p!r", lastWave += 5);
    round.addWave("!p!!!p", lastWave += 5);
    round.addWave("!!rp!r", lastWave += 3);
    round.addWave("!!rr!!", lastWave += 5);
    round.addWave("p!!!!p", lastWave += 3);
    round.addWave("!pppp!", lastWave += 3);
    round.addWave("!g!!g!", lastWave += 6);
    round.addWave("!!!r!!", lastWave += 3);
    round.addWave("!g!!!!", lastWave += 2);
    round.addWave("!!!!!p", lastWave += 7);
    round.play();
    return round;
};

rounds[7] = function() {
    var round = Crafty.e("Round");
    var lastWave = 0;
    round.create(7);
    round.addWave("!r!p!r", 1);
    round.addWave("!p!!!p", lastWave += 7);
    round.addWave("!r!r!r", lastWave += 3);
    round.addWave("!g!!g!", lastWave += 7);
    round.addWave("!!g!!!", lastWave += 8);
    round.addWave("p!!!!p", lastWave += 6);
    round.addWave("!r!!r!", lastWave += 3);
    round.addWave("!g!p!g", lastWave += 3);
    round.addWave("!!rr!!", lastWave += 7);
    round.addWave("!!!r!!", lastWave += 2);
    round.addWave("!pppp!", lastWave += 1);
    round.addWave("!!g!!!", lastWave += 4);
    round.addWave("!r!r!r", lastWave += 4);
    round.addWave("!p!!!p", lastWave += 6);
    round.addWave("p!p!p!", lastWave += 2);
    round.addWave("!!!r!!", lastWave += 6);
    round.addWave("!pppp!", lastWave += 2);
    round.addWave("p!p!p!", lastWave += 7);
    round.play();
    return round;
};