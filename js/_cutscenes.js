var loadCutScene = function() {
	switch(storage.level.get()) {
		case 1: 
			loadLevel(storage.level.get());
			break;
		default:
			loadLevel(storage.level.get());
			break;
	}
};

var cutscenes = [];
cutscenes[1] = function() {
	
};
