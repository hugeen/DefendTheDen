var loadScene = function(scene) {
	switch(scene) {
		case 1: 
			Crafty.scene("newGame");
			break;
		default:
			
			break;
	}
};

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
						console.log("finished");
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

var RoundOne = function() {
	round = Crafty.e("Round");
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