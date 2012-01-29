var storage = {};

storage.pigDied = new LocalStore('pig_died', {
    defaultVal: 0
});
storage.axeThrowed = new LocalStore('axe_trhowed', {
    defaultVal: 0
});
storage.goldCoins = new LocalStore('gold_coins', {
    defaultVal: 0
});

var DTD = {
    KeyBoardType: "QWERTY",
    viewPort: {
        w: 710,
        h: 580
    },
    sound: 1,
    music: 1
};

window.onload = (function() {

    Crafty.init(DTD.viewPort.w, DTD.viewPort.h);

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

            Crafty.e("NewGameMenuItem");
        });
    };

    Crafty.scene("titleScreen", function() {
        renderGameTitle();
    });

    Crafty.scene("newGame", function() {

        Crafty.load(["img/blood-sprite-die.png", "img/rails.png", "img/background-game.png", "img/axe-sprite.png"], function() {
            buildUI();
            makeBattlefield();

            DTD.skillChange = function() {
                if(DTD.skillBoundToMouse !== undefined) {
                    DTD.skillBoundToMouse.destroy();
                }
            };
            DTD.bindSkillToMouse = function(skill) {
                if(DTD.skillBoundToMouse !== undefined) {
                    DTD.skillBoundToMouse.destroy();
                }
                return skill;
            };

            DTD.player = Crafty.e("Wolf");
            DTD.player.attachSprite(Crafty.e("WolfSprite"));

            DTD.player.attachWagon(Crafty.e("Wagon"));

            DTD.skills = [];
            DTD.skills["throwingAxeSkill"] = throwingAxeSkill();
            //DTD.skills["bearTrapSkill"] = bearTrapSkill();

            allowPlayerMoves();
            RoundOne();
        });
    });

    Crafty.scene("titleScreen");
});
