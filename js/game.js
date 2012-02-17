var DTD = {
    KeyBoardType : "QWERTY",
    viewPort : {
        w : 710,
        h : 580
    },
    sound : 1,
    music : 1,
    inGame : false,
    paused : false,
    playingCutscene : false,
    gameType : "story"
};

DTD.skillList = [];
DTD.skillList["ThrowingAxe"] = {
    name : "Throwing Axe",
    key : 1,
    stats : [{
        damageMin : 10,
        damageMax : 20,
        coolDown : 1.250,
        goldCost : 0
    }, {
        damageMin : 14,
        damageMax : 24,
        coolDown : 1.0,
        goldCost : 5
    }, {
        damageMin : 18,
        damageMax : 28,
        coolDown : 0.725,
        goldCost : 15
    }]
};
DTD.skillList["ThrowingBrick"] = {
    name : "Throwing Brick",
    key : 3,
    stats : [{
        damageMin : 9,
        damageMax : 19,
        coolDown : 5,
        energyCost : 1,
        goldCost : 0
    }, {
        damageMin : 13,
        damageMax : 23,
        coolDown : 4.5,
        energyCost : 1,
        goldCost : 10
    }, {
        damageMin : 17,
        damageMax : 27,
        coolDown : 3,
        energyCost : 1,
        goldCost : 15
    }]
};

DTD.skillList["Blow"] = {
    name : "Blow",
    key : 2,
    stats : [{
        coolDown : 12,
        energyCost : 1,
        goldCost : 0
    }, {
        coolDown : 10,
        energyCost : 1,
        goldCost : 10
    }, {
        coolDown : 8,
        energyCost : 1,
        goldCost : 15
    }]
};

var sceneMaker = function(endless) {
    var endless = endless || false;
    var sceneName = (endless) ? "endless" : "storyLevel" + (new Date().getTime());
    Crafty.scene(sceneName, function() {
        Crafty.load(["img/piggy-sprite.png", "img/ridding-sprite.png", "img/sprite-granny.png", "img/wolf-sprite-2.png", "img/axe-sprite.png", "img/pie-sprite.png", "img/fireball-sprite.png", "img/wind-sprite.png", "img/rock-sprite.png", "img/wires-sprite.png", "img/under-rails.png", "img/blood-sprite.png", "img/blood-sprite-die.png", "img/gold-coin-drop.png", "img/gold-coin.png", "img/rails-sprite.png", "img/wagon.png", "img/skill-button-below.png", "img/skill-button-cooldown.png", "img/rock-skill.png", "img/wind-skill.png", "img/skill-button-pushed.png", "img/beartrap-sprite.png", "img/grass-piece-light.png", "img/grass-piece-dark.png"], function() {
            buildUI();
            makeBattlefield();
            if(endless) {
                DTD.gameType = "endless";
                loadLevel(false);
            } else {
                DTD.gameType = "story";
                loadCutScene();
            }

        });
    });
    Crafty.scene(sceneName);
};

window.onload = (function() {
    DTD.music = document.createElement('audio');
    DTD.music.setAttribute('src', 'audio/music_ekeynox.ogg');
    DTD.music.setAttribute('type', 'audio/ogg');
    DTD.music.setAttribute('loop', 'loop');
    if(!storage.sound.get()) {
        DTD.music.volume = 0;
        $("#sound").css("background-image", "url(img/sound-speaker-off.png)");
    }
    $(".upgradeSkill").live("click", function() {
        var skillLevel = 0;
        
        switch($(this).attr("type")) {
            case 'ThrowingAxe':
                skillLevel = storage.axeSkill;
                break;
            case 'Blow':
                skillLevel = storage.blowSkill;
                break;
            case 'ThrowingBrick':
                skillLevel = storage.rockSkill;
                break;
        }
        
        if(skillLevel.get() < 2) {

            if(DTD.skillList[$(this).attr("type")].stats[skillLevel.get()+1].goldCost <= storage.goldCoins.get()) {
                
                storage.goldCoins.set(storage.goldCoins.get()-DTD.skillList[$(this).attr("type")].stats[skillLevel.get()+1].goldCost);
                skillLevel.set(skillLevel.get()+1);
                removeSkillShopUI();
                Crafty.scene("skillShop");
            }
        }
    });
    $("#sound").live("click", function() {
        if(storage.sound.get()) {
            DTD.music.volume = 0;
            $(this).css("background-image", "url(img/sound-speaker-off.png)");
            storage.sound.set(false);
        } else {
            DTD.music.volume = 1;
            $(this).css("background-image", "url(img/sound-speaker-on.png)");
            storage.sound.set(true);
        }
    });
    $("#menuPauseResume").live("click", function() {
        Crafty.pause();
    });
    $("#menuPauseBackToMain").live("click", function() {
        Crafty.pause();
        $(".youWin").remove();
        removeUI();
        Crafty.scene("titleScreen");
    });

    $('.extLink').live("click", function() {
        pokki.openURLInDefaultBrowser($(this).attr("href"));
        return false;
    });
    $("#endlessFromCredits").live("click", function() {
        removeCreditsUI();
        sceneMaker(true);
    });
    $("#skillShopPlay").live("click", function() {
        removeSkillShopUI();
        sceneMaker();
    });

    $("#skillShopBack").live("click", function() {
        removeSkillShopUI();
        Crafty.scene("titleScreen");
    });
    
    $("#creditsBack").live("click", function() {
        removeCreditsUI();
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
        if(DTD.playingCutscene) {
            $(".cutscene").remove();
            DTD.playingCutscene.destroy();
            DTD.playingCutscene = false;
        }
        Crafty.load(["img/background.png", "img/clouds.png", "img/floor.png", "img/menu-sprites.png"], function() {
            Crafty.e("2D, DOM").attr({
                w : DTD.viewPort.w,
                h : DTD.viewPort.h,
                x : 0,
                y : 0
            }).css("background", "url(img/background.png)").css("z-index", "0");

            Crafty.e("Clouds");

            Crafty.e("2D, DOM").attr({
                w : DTD.viewPort.w,
                h : 309,
                x : 0,
                y : DTD.viewPort.h - 309
            }).css("background", "url(img/floor.png)").css("z-index", "0");

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
    };

    Crafty.scene("titleScreen", function() {
        if(currentRound !== false) {
            currentRound.destroy();
        }
        currentRound = false;
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

    Crafty.scene("credits", function() {

        Crafty.load(["img/blood-sprite-die.png", "img/rails.png", "img/axe-sprite.png"], function() {

            Crafty.e("2D, DOM").attr({
                w : DTD.viewPort.w,
                h : DTD.viewPort.h,
                x : 0,
                y : 0
            }).css("background", "url(img/background.png)").css("z-index", "0");
            buildCreditsUI();

        });
    });

    Crafty.scene("titleScreen");
});
