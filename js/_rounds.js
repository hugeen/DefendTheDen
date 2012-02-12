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
	if(level > 1) {
		DTD.skills["blowSkill"] = blowSkill();
	}
	if(level > 3) {
		//DTD.skills["rockSkill"] = rockSkill();
	}
	
	rounds[level]();
};

var youWin = function() {
	$("body").append('<div class="youWin">You WIN !</div>');
};

var youLoose = function() {
	$("body").append('<div class="youWin">You LOOSE !</div>');
};

var currentRound;
Crafty.c("Round", {
	init: function() {
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
			this._roundPause += (new Date().getTime())-this._roundPauseBuffer;
		});
		this.bind("EnterFrame", function() {
			
			if(this._played) {		
				var now = parseInt(new Date().getTime(), 10);
				var start = this._startAt;

				if(this._endAt+1000+this._roundPause  > now) {
					var self = this;
					_.each(this.waves, function(item, key) {
						if((item.at*1000)+self._roundPause < now-start) {
							if(!item.played) {
								item.played = true;
								var wave = waveParser(item.wave);
								for(i=0; i < 6; i++) {
									if(wave[i] != "Nobody") {
										var newEnemy = Crafty.e(wave[i]);
					                    newEnemy.setToLine(i+1);
					                    newEnemy.attachSprite(Crafty.e(wave[i]+"Sprite"));
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
							storage.level.set(storage.level.get()+1);
							loadScene(storage.level.get());
						},2000);
					}
				}
			};
			currentRound = this;
		});
	},
	create: function(id) {
		this._roundId = id;
	},
	addWave: function(wave, at) {
		this.waves.push({
			wave: wave,
			at : at,
			played: false
		});
	},
	play: function() {
		var that = this;
		var lastWave = _.last(this.waves);
		this._monsterCount = monsterCount(this.waves);
		this._monstersDied = 0;
		this._played = true;
		this._duration = lastWave.at*1000;
		this._startAt = parseInt(new Date().getTime(), 10);
		this._endAt = this._startAt+this._duration;
		for (var i = 1; i <= 20; i++) {
			this.realDelay(function() {
				$("#progressBar .empty").last().removeClass("empty").addClass("full");
			}, (this._duration/20)*i);
		}
		$("#levelNumber span").html(this._roundId);
	}
});
var rounds = [];
rounds[1] = function() {
	var round = Crafty.e("Round");
	var lastWave = 0;
	round.create(1);
	round.addWave("!p!!p!",lastWave++);
	round.addWave("!!!p!!",lastWave+=3);
	round.addWave("!p!p!!",lastWave+=3);
	round.addWave("p!!!p!",lastWave+=4);
	round.addWave("!p!p!!",lastWave+=4);
	round.addWave("!!p!!!",lastWave+=2);
	round.addWave("!!!!!p",lastWave+=1);
	round.play();
	return round;
};

rounds[2] = function() {
	var round = Crafty.e("Round");
	var lastWave = 0;
	round.create(2);
	round.addWave("!!p!p!",lastWave++);
	round.addWave("!p!p!!",lastWave+=4);
	round.addWave("!p!p!p",lastWave+=4);
	round.addWave("p!!!p!",lastWave+=6);
	round.addWave("p!p!p!",lastWave+=4);
	round.addWave("p!!!p!",lastWave+=6);
	round.addWave("pp!!pp",lastWave+=4);
	round.play();
	return round;
};

rounds[3] = function() {
	var round = Crafty.e("Round");
	var lastWave = 0;
	round.create(3);
	round.addWave("!!!!!r",lastWave++);
	round.addWave("!!!!r!",lastWave+=1.5);
	round.addWave("!!!r!!",lastWave+=1.5);
	round.addWave("!!r!!!",lastWave+=1.5);
	round.addWave("!r!!!!",lastWave+=1.5);
	round.addWave("r!!!!!",lastWave+=1.5);
	round.addWave("p!!!!r",lastWave+=1.5);
	round.addWave("p!!!!r",lastWave+=3);
	round.addWave("!p!!r!",lastWave+=3);
	round.addWave("!!pr!!",lastWave+=3);
	round.addWave("prprpr",lastWave+=3);
	round.play();
	return round;
};

rounds[4] = function() {
	var round = Crafty.e("Round");
	var lastWave = 0;
	round.create(3);
	round.addWave("!!!!!r",lastWave++);
	round.addWave("!!!!r!",lastWave+=1.5);
	round.addWave("!!!r!!",lastWave+=1.5);
	round.addWave("!!r!!!",lastWave+=1.5);
	round.addWave("!r!!!!",lastWave+=1.5);
	round.addWave("r!!!!!",lastWave+=1.5);
	round.addWave("p!!!!r",lastWave+=1.5);
	round.addWave("p!!!!r",lastWave+=3);
	round.addWave("!p!!r!",lastWave+=3);
	round.addWave("!!pr!!",lastWave+=3);
	round.addWave("prprpr",lastWave+=3);
	round.play();
	return round;
};

rounds[5] = function() {
	var round = Crafty.e("Round");
	var lastWave = 0;
	round.create(5);
	round.addWave("!!!g!!",1);
	round.addWave("!p!!p!",lastWave+=7);
	round.addWave("!!r!!!",lastWave+=3);
	round.addWave("!!!!r!",lastWave+=1.5);
	round.addWave("!p!!!!",lastWave+=1.5);
	round.addWave("!!!r!p",lastWave+=1.5);
	round.addWave("p!!!p!",lastWave+=3);
	round.addWave("pppppp",lastWave+=3);
	round.play();
	return round;
};