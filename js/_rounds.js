var rounds = [];

Crafty.c("Round", {
	init: function() {
		this._start = 0;
		this.waves = [];
		
		this._played = false;
		this.bind("EnterFrame", function() {
			
			if(this._played) {		
				var now = parseInt(new Date().getTime(), 10);
				var start = this._startAt;
				var newProgressBarW = (this._endAt - parseInt(new Date().getTime(), 10)) * (468 / this._duration);
				
				if(this._endAt+1000 > now) {
					$("#progressBar").width(468 - newProgressBarW);
					//console.log(newProgressBarW);
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
					this._played = false;
					console.log("finished");
				}
			}
		});
	},
	create: function(id) {
		this._roundId = id;
		rounds[this.id] = this;
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
		this._played = true;
		this._duration = lastWave.at*1000
		this._startAt = parseInt(new Date().getTime(), 10);
		this._endAt = this._startAt+this._duration;
	}
});

RoundOne = Crafty.e("Round");
RoundOne.create(1);
RoundOne.addWave("!!p!!p",1);
RoundOne.addWave("pp!pp!",5);
RoundOne.addWave("!!p!!!",15);

