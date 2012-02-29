(function() {

    $(document).ready(function() {

        // Initialize Crafty
        Crafty.init(DTD.viewPort.w, DTD.viewPort.h);
        
        Crafty.audio.add("music_ekeynox", "audio/music_ekeynox.ogg");
        Crafty.audio.add("click", "audio/_click.ogg");
        Crafty.audio.add("howl", "audio/_howl.ogg");
        Crafty.audio.add("money", "audio/_money.ogg");
        Crafty.audio.add("throwAxe", "audio/_throwAxe.ogg");
        Crafty.audio.add("wound", "audio/_wound.ogg");
        
        Crafty.audio.play("music_ekeynox");
        Crafty.audio.settings("music_ekeynox", {loop: true});
        
        // Crafty pause Handler
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
        
        // Manage sound volume
        if(!storage.sound.get()) {
            DTD.music.volume = 0;
            $("#sound").css("background-image", "url(img/sound-speaker-off.png)");
        }
        
        
        // Bind mouseclick events
        $(".upgradeSkill").live("click", function() {
            var skillLevel = 0;
            switch($(this).attr("type")) {
                case 'ThrowingAxe':
                    skillLevel = storage.axeSkill;
                    break;
                case 'Blow':
                    skillLevel = storage.blowSkill;
                    break;
                case 'DTD.ThrowingRock':
                    skillLevel = storage.rockSkill;
                    break;
            }
            if(skillLevel.get() < 2) {
                if(DTD.skillList[$(this).attr("type")].stats[skillLevel.get() + 1].goldCost <= storage.goldCoins.get()) {
                    storage.goldCoins.set(storage.goldCoins.get() - DTD.skillList[$(this).attr("type")].stats[skillLevel.get() + 1].goldCost);
                    skillLevel.set(skillLevel.get() + 1);
                    DTD.removeSkillShopUI();
                    Crafty.scene("skillShop");
                }
            }
        });

        $("#sound").live("click", function() {
            if(storage.sound.get()) {
                DTD.music.volume = 0;
                $(this).css("background-image", "url(img/sound-speaker-off.png)");
                Crafty.audio.settings("music_ekeynox", {muted: true});
                storage.sound.set(false);
            } else {
                DTD.music.volume = 1;
                $(this).css("background-image", "url(img/sound-speaker-on.png)");
                Crafty.audio.settings("music_ekeynox", {muted: false});
                storage.sound.set(true);
            }
        });

        $("#menuPauseResume").live("click", function() {
            Crafty.pause();
        });

        $("#menuPauseBackToMain").live("click", function() {
            Crafty.pause();
            $(".youWin").remove();
            DTD.removeUI();
            Crafty.scene("titleScreen");
        });

        $('.extLink').live("click", function() {
            pokki.openURLInDefaultBrowser($(this).attr("href"));
            return false;
        });

        $("#endlessFromCredits").live("click", function() {
            DTD.removeCreditsUI();
            DTD.sceneMaker(true);
        });

        $("#skillShopPlay").live("click", function() {
            DTD.removeSkillShopUI();
            DTD.sceneMaker();
        });

        $("#skillShopBack").live("click", function() {
            DTD.removeSkillShopUI();
            Crafty.scene("titleScreen");
        });

        $("#creditsBack").live("click", function() {
            DTD.removeCreditsUI();
            Crafty.scene("titleScreen");
        });
        
        // Load titleScreen
        Crafty.scene("titleScreen");
        
        // Track mousemove
        DTD.allowPlayerMoves();
        
    });
    
})();

