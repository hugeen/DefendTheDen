Crafty.scene("main", function() {

	var elements = [
        "src/interfaces/mainMenu.js"
	];
	
	require(elements, function() {	   
		new MainMenu();
	});

});
