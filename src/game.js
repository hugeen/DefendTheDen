window.onload = function() {
        
    var version = null,
    	today = new Date(),
    	debug = true;

    if(gameContainer.env == 'dev') {
		version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
	} else {
		version = gameContainer.gameVersion;
	};

	Crafty.init(710, 580);
	Crafty.canvas.init();
	
	require([
	         "src/sprites.js?v="+version+"",
	         "src/config.js?v="+version+""
	], function() {
	    // Mouse Event
    	Crafty.mousePosition = {
            x: 0,
            y: 0
        }
        $("#cr-stage").mousemove(function(e){
            Crafty.mousePosition = {
                x: e.pageX-$(this).offset().left,
                y: e.pageY-$(this).offset().top
            }
        });
        $("#cr-stage").click(function() {
            Crafty.trigger("GlobalClick", {x: Crafty.mousePosition.x, y: Crafty.mousePosition.y});
        });
		var sprites = new Sprites();
		sprites.create();
		gameContainer['conf'] = new Config({});
		Crafty.scene("loading", function() {
            sc = []; infc = [];   

			var loadingText = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
					.attr({w: 500, h: 20, x: ((Crafty.viewport.width) / 2), y: (Crafty.viewport.height / 2), z: 2})
					.text('Loading...')
					.textColor('#000')
					.textFont({'size' : '24px', 'family': 'Arial'});

			Crafty.load(sprites.getPaths(), function() {
                var elements = [
                    "src/components/Hitbox.js?v="+version+"",
                    "src/components/Utils.js?v="+version+"",
                    "src/components/Interface.js?v="+version+"",
                    "src/components/characters/Wolf.js?v="+version+"",
                    "src/components/characters/Enemy.js?v="+version+"",
                    "src/components/characters/Pig.js?v="+version+"",
                    "src/components/skills/Bullet.js?v="+version+"",
                    "src/components/skills/Axe.js?v="+version+"",
                    "src/entities/base/BaseEntity.js?v="+version+""
	    		];

    			require(elements, function() {	   
    				loadingText.destroy();
    				if (gameContainer.scene != undefined) {
    					Crafty.scene(gameContainer.scene);
    				}
    			});
    		},
			function(e) {
				loadingText.text('Loading ('+(e.percent.toFixed(0))+'%)');
			});
		});
		
		var scenes = [
			"src/scenes/main.js?v="+version+"",
			"src/scenes/stage.js?v="+version+""
		];
		
		require(scenes, function(){});
		Crafty.scene("loading");
	});
	
	

};