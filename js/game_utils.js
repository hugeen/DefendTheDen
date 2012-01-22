var isMultiwayPress = function(component) {
	return component.isDown("UP_ARROW") ||
		component.isDown("W") ||
		component.isDown("LEFT_ARROW") ||
		component.isDown("A") ||
		component.isDown("RIGHT_ARROW") ||
		component.isDown("D") ||
		component.isDown("DOWN_ARROW") ||
		component.isDown("S");
};

var hitDenWalls = function(component) {
	return component.hit("DenWallLeft") ||
		component.hit("DenWallRight") ||
		component.hit("DenWallTop") ||
		component.hit("DenWallBottom");
};