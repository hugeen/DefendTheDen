(function() {
    
    DTD.sceneMaker = function(endless) {
        var endless = endless || false;
        var sceneName = (endless) ? "endless" : "storyLevel" + (new Date().getTime());
        Crafty.scene(sceneName, function() {
            Crafty.load(["img/piggy-sprite.png", "img/ridding-sprite.png", "img/sprite-granny.png", "img/wolf-sprite-2.png", "img/axe-sprite.png", "img/pie-sprite.png", "img/fireball-sprite.png", "img/wind-sprite.png", "img/rock-sprite.png", "img/wires-sprite.png", "img/under-rails.png", "img/blood-sprite.png", "img/blood-sprite-die.png", "img/gold-coin-drop.png", "img/gold-coin.png", "img/rails-sprite.png", "img/wagon.png", "img/skill-button-below.png", "img/skill-button-cooldown.png", "img/rock-skill.png", "img/wind-skill.png", "img/skill-button-pushed.png", "img/beartrap-sprite.png", "img/grass-piece-light.png", "img/grass-piece-dark.png"], function() {
                DTD.buildUI();
                DTD.makeBattlefield();
                if(endless) {
                    DTD.gameType = "endless";
                    DTD.loadLevel(false);
                } else {
                    DTD.gameType = "story";
                    DTD.loadCutScene();
                }

            });
        });
        Crafty.scene(sceneName);
    };
    
    Crafty.scene("titleScreen", function() {

        // Force destroy the round object - FIXME
        if(DTD.currentRound !== false) {
            DTD.currentRound.destroy();
        }
        DTD.currentRound = false;

        // Force destroy cutscenes
        if(DTD.playingCutscene) {
            $(".cutscene").remove();
            DTD.playingCutscene.destroy();
            DTD.playingCutscene = false;
        }

        Crafty.load(["img/background.png", "img/clouds.png", "img/floor.png", "img/menu-sprites.png"], function() {

            // Background
            Crafty.e("2D, DOM").attr({
                w : DTD.viewPort.w,
                h : DTD.viewPort.h,
                x : 0,
                y : 0
            }).css("background", "url(img/background.png)").css("z-index", "0");

            // Clouds
            Crafty.e("Clouds");

            // Floor
            Crafty.e("2D, DOM").attr({
                w : DTD.viewPort.w,
                h : 309,
                x : 0,
                y : DTD.viewPort.h - 309
            }).css("background", "url(img/floor.png)").css("z-index", "0");

            // Menu links
            Crafty.e("GameTitle");
            Crafty.e("NewGameMenuItem");
            if(storage.level.get() > 1) {
                Crafty.e("ContinueMenuItem");
            }
            if(storage.endless.get()) {
                Crafty.e("EndlessMenuItem");
                if(storage.endlessScore.get()) {
                    Crafty.e("EndlessScore");
                }
            }
            Crafty.e("CreditsMenuItem");

        });
    }, function() {
        DTD.inGame = true;
    }, function() {
        DTD.inGame = false;
    });

    Crafty.scene("skillShop", function() {
        DTD.buildSkillShopUI();
    });

    Crafty.scene("credits", function() {
        Crafty.e("2D, DOM").attr({
            w : DTD.viewPort.w,
            h : DTD.viewPort.h,
            x : 0,
            y : 0
        }).css("background", "url(img/background.png)").css("z-index", "0");
        DTD.buildCreditsUI();
    });
    
})();
