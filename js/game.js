var DefendTheDen = {
    KeyBoardType: "QWERTY",
    viewPort: {
        w: 710,
        h: 580
    },
    sound: 1,
    music: 1
};

var debugMode = true;

window.onload = (function() {

    Crafty.init(DefendTheDen.viewPort.w, DefendTheDen.viewPort.h);

    var renderGameTitle = function() {
        Crafty.load(["img/background.png", "img/clouds.png", "img/floor.png", "img/menu-sprites.png"], function() {
            //new Sound(soundResources.titleScreen, { loop: true, type: 'music' }).play();
            Crafty.e("2D, DOM").attr({
                w: DefendTheDen.viewPort.w,
                h: DefendTheDen.viewPort.h,
                x: 0,
                y: 0
            }).css("background", "url(img/background.png)").css("z-index", "0");

            Crafty.e("Clouds");

            Crafty.e("2D, DOM").attr({
                w: DefendTheDen.viewPort.w,
                h: 309,
                x: 0,
                y: DefendTheDen.viewPort.h - 309
            }).css("background", "url(img/floor.png)").css("z-index", "0");

            Crafty.e("NewGameMenuItem");
        });
    };

    Crafty.scene("titleScreen", function() {
        renderGameTitle();
    });

    Crafty.scene("newGame", function() {

        Crafty.load(["img/rails.png", "img/background-game.png", "img/pig-sprite.png", "img/pig-sprite.png", "img/axe-sprite.png"], function() {

            Crafty.e("2D, Canvas, Image, Mouse").attr({
                w: DefendTheDen.viewPort.w,
                h: DefendTheDen.viewPort.h,
                x: 0,
                y: 0
            }).image("img/background-game.png", "repeat").bind("MouseOver", function() {

            });

            Crafty.e("2D, Canvas, Sprite, Mouse, rails").attr({
                y: 98,
                w: 74,
                h: 430
            }).sprite(0, 0, 1, 6);

            var denWall = {
                left: Crafty.e("DenWallLeft"),
                right: Crafty.e("DenWallRight"),
                top: Crafty.e("DenWallTop"),
                bottom: Crafty.e("DenWallBottom")
            };
			DefendTheDen.skillChange = function() {
				if(DefendTheDen.skillBoundToMouse !== undefined) {
                    DefendTheDen.skillBoundToMouse.destroy();
                }
			}
            DefendTheDen.bindSkillToMouse = function(skill) {
                if(DefendTheDen.skillBoundToMouse !== undefined) {
                    DefendTheDen.skillBoundToMouse.destroy();
                }
                return skill;
            };

            DefendTheDen.wolf = Crafty.e("Wolf");
            DefendTheDen.wolf.attachSprite(Crafty.e("WolfSprite"));

            DefendTheDen.wolf.attachWagon(Crafty.e("Wagon"));

            DefendTheDen.skills = [];
            DefendTheDen.skills["throwingAxeSkill"] = new SkillButton(1, "ThrowingAxe", {
                cooldown: 0.625,
                action: function() {
                    throwAxe();
                }
            });
            DefendTheDen.skills["bearTrapSkill"] = new SkillButton(2, "BearTrap", {
                cooldown: 5,
                action: function() {
                    DefendTheDen.skillBoundToMouse = DefendTheDen.bindSkillToMouse(Crafty.e("BearTrap").attr({
                        x: DefendTheDen.wolf.x,
                        y: DefendTheDen.wolf.y
                    }));
                },
                keyBind: 2,
                sprite: 'bearTrapSkill'
            });

            setInterval(function() {
                var newPig = Crafty.e("Pig");
                newPig.setToLine(Crafty.randRange(1, 6));
                newPig.attachSprite(Crafty.e("PigSprite"));
            }, 1250);
            makeMatrix();

            $(document).mousemove(function(e) {

                if(e.pageY >= denWall.top._y && e.pageY <= denWall.bottom._y - 60) {
                    DefendTheDen.wolf.attr({
                        y: e.pageY
                    });
                }

            });
        });
    });

    Crafty.scene("titleScreen");

});
