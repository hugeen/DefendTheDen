Crafty.scene("stage", function() {

	var elements = [
        "src/entities/skoll.js",
        "src/interfaces/background.js",
        "src/interfaces/lines.js",
        "src/interfaces/sky.js",
        "src/interfaces/earth.js"
	];
	
	require(elements, function() {	   
		sc['skoll'] = new Skoll();
		infc['background'] = new Background();
		infc['lines'] = new Lines();
		infc['sky'] = new Sky();
		infc['earth'] = new Earth();
	});

});
