
var DTD = {
    KeyBoardType: "QWERTY",
    viewPort: {
        w: 710,
        h: 580
    },
    sound: 1,
    music: 1,
    inGame: false,
    paused: false
};

DTD.skillList = [];
DTD.skillList["ThrowingAxe"] = {
	name: "Throwing Axe",
	key: 1,
	stats: [{
		damageMin: 45,
		damangeMax: 65,
		coolDown: 0.725,
		energyCost: 0,
		goldCost: 0
	},{
		damageMin: 65,
		damangeMax: 85,
		coolDown: 0.625,
		energyCost: 0,
		goldCost: 10
	},{
		damageMin: 85,
		damangeMax: 105,
		coolDown: 0.525,
		energyCost: 0,
		goldCost: 20
	},]
};
DTD.skillList["ThrowingBrick"] = {
	name: "Throwing Brick",
	key: 1,
	stats: [{
		damageMin: 30,
		damangeMax: 50,
		coolDown: 2.00,
		energyCost: 15,
		goldCost: 0
	},{
		damageMin: 40,
		damangeMax: 60,
		coolDown: 1.725,
		energyCost: 15,
		goldCost: 15
	},{
		damageMin: 60,
		damangeMax: 70,
		coolDown: 1.500,
		energyCost: 15,
		goldCost: 25
	},]
};

var sceneMaker = function() {
	var sceneName = "storyLevel"+(new Date().getTime());
	Crafty.scene(sceneName, function() {
        Crafty.load(["img/blood-sprite-die.png", "img/rails.png", "img/axe-sprite.png"], function() {
            buildUI();
            makeBattlefield();
			loadCutScene();
        });
    });
    Crafty.scene(sceneName);
};

window.onload = (function() {
	$("#menuPauseResume").live("click", function() {
		Crafty.pause();
	});
	$("#menuPauseBackToMain").live("click", function() {
		Crafty.pause();
		$(".youWin").remove();
		removeUI();
		Crafty.scene("titleScreen");
	});
    Crafty.init(DTD.viewPort.w, DTD.viewPort.h);
    Crafty.bind("Pause", function() {
    	if(DTD.inGame) {
    		DTD.paused = true;
    		$("#pause").show();
    	}
    });
    Crafty.bind("Unpause", function() {
    	if(DTD.inGame) {
    		DTD.paused = false;
    		$("#pause").hide();
    	}
    });
	allowPlayerMoves();
    var renderGameTitle = function() {
        Crafty.load(["img/background.png", "img/clouds.png", "img/floor.png", "img/menu-sprites.png"], function() {
            //new Sound(soundResources.titleScreen, { loop: true, type: 'music' }).play();
            Crafty.e("2D, DOM").attr({
                w: DTD.viewPort.w,
                h: DTD.viewPort.h,
                x: 0,
                y: 0
            }).css("background", "url(img/background.png)").css("z-index", "0");

            Crafty.e("Clouds");

            Crafty.e("2D, DOM").attr({
                w: DTD.viewPort.w,
                h: 309,
                x: 0,
                y: DTD.viewPort.h - 309
            }).css("background", "url(img/floor.png)").css("z-index", "0");
            
			Crafty.e("GameTitle");
			
            Crafty.e("NewGameMenuItem");
            
            if(storage.level.get() > 1) {
            	Crafty.e("ContinueMenuItem");
            }
        });
    };

    Crafty.scene("titleScreen", function() {
        renderGameTitle();
    }, function() {
    	DTD.inGame = true;
    }, function() {
    	DTD.inGame = false;
    });
    
    Crafty.scene("skillShop", function() {

        Crafty.load(["img/blood-sprite-die.png", "img/rails.png", "img/axe-sprite.png"], function() {
            buildSkillShopUI();
        });
        
    });

    Crafty.scene("titleScreen");
    
        $("#skillShopPlay").live("click", function() {
    	removeSkillShopUI();
    	sceneMaker();
    });
    
    $("#skillShopBack").live("click", function() {
    	removeSkillShopUI();
    	Crafty.scene("titleScreen");
    });
});
