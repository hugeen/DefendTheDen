var updateGolds = function(nb) {
    storage.goldCoins.set(storage.goldCoins.get()+1);
    $('#goldCount').html(storage.goldCoins.get());
    $('#goldCoin').effect("shake", { distance: 5, times: 1}, 100);
};

var makeMatrix = function() {
	var cols = 9;
	var rows = 6;
	for(var cols_i=1; cols_i<=cols; cols_i++) {
		for(var rows_i=1; rows_i<=rows; rows_i++) {
			Crafty.e("Cell").attr({
				x: 65+(cols_i*65)-65,
				y: 90+(rows_i*70)-70
			});
		}
	}
};

var isInViewPort = function(component) {
	return component.x < DTD.viewPort.w &&
		component.x > 0 &&
		component.y < DTD.viewPort.h &&
		component.y > 0;
};

var attachSpriteTo = function(mainComponent, spriteComponent) {
	mainComponent._spriteComponent = spriteComponent;
	spriteComponent.bind("EnterFrame", function() {
		this.attr({
			x: mainComponent.x-this._mainComponentAttr.x,
			y: mainComponent.y-this._mainComponentAttr.y
		});
	});
};


var waveParser = function(waveString) {
	var lines = [];
	for(i=0; i < 6; i++) {
		var enemy = waveString[i];
		switch(waveString[i]) {
			case 'p':
				enemy = "Pig";
				break;
			case '!':
				enemy = "Nobody";
				break;
			default:
				enemy = "Nobody";
		}
		lines[i] = enemy;
	}
	return lines;
};

var monsterCount = function(waves) {
	var monsterCount = 0;
	_.each(waves, function(item){
		for(i=0; i < 6; i++) {
			if(item.wave[i] != "!") {
				monsterCount++;
			}
		}
	});
	return monsterCount;
};

var pauseGame = function() {
	/*Crafty.stop();*/
};
