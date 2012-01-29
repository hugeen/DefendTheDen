var loadScene = function(scene) {
	switch(scene) {
		case 1: 
			resetStorage();
			Crafty.scene("storyLevel");
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
	DTD.inGame = true;
	rounds[level]();
};

var youWin = function() {
	$("body").append('<div class="youWin">You WIN !</div>');
}

var youLoose = function() {
	$("body").append('<div class="youWin">You LOOSE !</div>');
}

var currentRound;
Crafty.c("Round", {
	init: function() {
		this._start = 0;
		this.waves = [];
		this._monsterCount = 0;
		this._monstersDied = 0;
		this._played = false;
		this.bind("EnterFrame", function() {
			
			if(this._played) {		
				var now = parseInt(new Date().getTime(), 10);
				var start = this._startAt;
				var newProgressBarW = (this._endAt - parseInt(new Date().getTime(), 10)) * (468 / this._duration);
				
				if(this._endAt+1000 > now) {
					$("#progressBar").width(468 - newProgressBarW);
					_.each(this.waves, function(item, key) {
						if(item.at*1000 < now-start) {
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
		$("#levelNumber span").html(this._roundId);
	}
});
var rounds = [];
rounds[1] = function() {
	var round = Crafty.e("Round");
	round.create(1);
	round.addWave("!!!!!p",1);
	round.addWave("!!!!p!",3);
	round.addWave("!!!p!!",5);
	round.addWave("!!p!!!",7);
	round.addWave("!!p!p!",12);
	round.addWave("p!ppp!",18);
	round.addWave("p!ppp!",25);
	round.addWave("!pp!!!",27);
	round.play();
	return round;
};