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

var makeBattlefield = function() {

};
Crafty.c("GrassField", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: DefendTheDen.viewPort.w,
            h: DefendTheDen.viewPort.h,
            x: 0,
            y: 0,
            z: 0
        });
        this.image("img/bg-lines.png", "no-repeat");
    }
});

Crafty.c("SideRails", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: 74,
            h: 580,
            x: 0,
            y: 0,
            z: 0
        });
        this.image("img/rails-sprite.png", "no-repeat");
    }
});

Crafty.c("EarthBackground", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: DefendTheDen.viewPort.w,
            h: DefendTheDen.viewPort.h,
            x: 0,
            y: 0,
            z: 0
        });
        this.image("img/background-earth.png", "no-repeat");
    }
});

Crafty.c("SkyBackground", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: DefendTheDen.viewPort.w,
            h: DefendTheDen.viewPort.h,
            x: 0,
            y: 0,
            z: 0
        });
        this.image("img/background-sky.png", "no-repeat");
    }
});

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

			Crafty.e("GrassField");
			Crafty.e("SideRails");
			Crafty.e("EarthBackground");
			Crafty.e("SkyBackground");

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
            };
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
                    DefendTheDen.wolf._spriteComponent.stop().animate("throwAxe", 18, 0);
                    setTimeout(function() {
                        throwAxe();

                    }, 20 * 20 * 0.9);
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

            var newPig = Crafty.e("Pig");
            newPig.setToLine(Crafty.randRange(1, 6));
            newPig.attachSprite(Crafty.e("PigSprite"));

            setInterval(function() {
                var newPig = Crafty.e("Pig");
                newPig.setToLine(Crafty.randRange(1, 6));
                newPig.attachSprite(Crafty.e("PigSprite"));
            }, 4250);
            makeMatrix();

            $(document).mousemove(function(e) {

                if(e.pageY >= denWall.top._y - 15 && e.pageY <= denWall.bottom._y - 30 ) {
                    DefendTheDen.wolf.attr({
                        y: e.pageY
                    });
                }

            });
        });
    });

    Crafty.scene("titleScreen");

});
