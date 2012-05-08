Crafty.scene("main", function() {

	var elements = [
        "src/interfaces/background.js",
        "src/interfaces/clouds.js",
        "src/interfaces/floor.js",
        "src/interfaces/newGame.js",
        "src/interfaces/continueGame.js"
	];
	
	require(elements, function() {	   
		infc['background'] = new Background();
		infc['floor'] = new Floor();
		infc['clouds'] = new Clouds();
		infc['cloudsBis'] = new Clouds({x: 916});
		infc['newGame'] = new NewGame();
		infc['continueGame'] = new ContinueGame();
	});

});
