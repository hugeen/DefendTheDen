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

var debugMode = true;

var makeBattlefield = function() {

};
var buildUI = function() {
    $("body").append(+'' + '<a id="menu" href="#">' + '<span>Menu</span>' + '</a>' + '<div id="portrait">' + '<div id="lifeBar">' + '<div id="lifeBarProgress"></div>' + '<span></span>' + '</div>' + '<div id="energyBar">' + '<div id="energyBarProgress"></div>' + '<span></span>' + '</div>' + '<div id="goldCount">' + storage.goldCoins.get() + '</div>' + '<div id="goldCoin"></div>' + '</div>' + '<div id="levelNumber">LEVEL <span>15</span></div>' + '<div id="progressBarBelow">' + '<div id="progressBar"></div>' + '</div>' + '');
};

Crafty.c("GrassField", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: DTD.viewPort.w,
            h: DTD.viewPort.h,
            x: 0,
            y: 0,
            z: 0
        });
        this.image("img/bg-lines.png", "no-repeat");
    }
});

Crafty.c("SideRails", {
    init: function() {
        this.addComponent("2D, Canvas, Sprite, rails");
        this.attr({
            w: 74,
            h: 580,
            x: 0,
            y: 0,
            z: 0
        });
    }
});

Crafty.c("EarthBackground", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: DTD.viewPort.w,
            h: DTD.viewPort.h,
            x: 0,
            y: 0,
            z: 13
        });
        this.image("img/background-earth.png", "no-repeat");
    }
});

Crafty.c("SkyBackground", {
    init: function() {
        this.addComponent("2D, Canvas, Image");
        this.attr({
            w: DTD.viewPort.w,
            h: DTD.viewPort.h,
            x: 0,
            y: 0,
            z: 0
        });
        this.image("img/background-sky.png", "no-repeat");
    }
});

Crafty.c("GrassLine", {
    init: function() {
        this.addComponent("2D, Canvas, Sprite");
        this.attr({
            w: 157,
            h: 157
        });

    }
});

var grassLine = function(line) {
    var component = "grassLight";
    var yBase = 125;
    var xBase = 75;
    var hBase = 70;
    var wBase = 157;

    var yNew = 125 + (70 * (line - 1));

    switch(line) {
        case 6:
            zIndex = 12;
            var component = "grassDark";
            break;
        case 5:
            zIndex = 10;
            var component = "grassLight";
            break;
        case 4:
            zIndex = 8;
            var component = "grassDark";
            break;
        case 3:
            zIndex = 6;
            var component = "grassLight";
            break;
        case 2:
            zIndex = 4;
            var component = "grassDark";
            break;
        case 1:
            zIndex = 2;
            var component = "grassLight";
            break;
    }

    for(var i = 0; i <= 4; i++) {
        Crafty.e("GrassLine").addComponent(component).attr({
            x: 80 + (yBase * i),
            y: yNew,
            z: zIndex
        });
    }

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
            Crafty.e("GrassField");
            Crafty.e("SideRails");
            Crafty.e("EarthBackground");
            Crafty.e("SkyBackground");
            grassLine(1);
            grassLine(2);
            grassLine(3);
            grassLine(4);
            grassLine(5);
            grassLine(6);

            var denWall = {
                left: Crafty.e("DenWallLeft"),
                right: Crafty.e("DenWallRight"),
                top: Crafty.e("DenWallTop"),
                bottom: Crafty.e("DenWallBottom")
            };
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
            DTD.skills["throwingAxeSkill"] = new SkillButton(1, "ThrowingAxe", {
                cooldown: 0.625,
                action: function() {
                    DTD.player._spriteComponent.stop().animate("throwAxe", 18, 0);
                    setTimeout(function() {
                        throwAxe();

                    }, 20 * 20 * 0.9);
                }
            });
            DTD.skills["bearTrapSkill"] = new SkillButton(2, "BearTrap", {
                cooldown: 5,
                action: function() {
                    DTD.skillBoundToMouse = DTD.bindSkillToMouse(Crafty.e("BearTrap").attr({
                        x: DTD.player.x,
                        y: DTD.player.y
                    }));
                },
                keyBind: 2,
                sprite: 'bearTrapSkill'
            });

            makeMatrix();

            $(document).mousemove(function(e) {
                if(!DTD.player._paused) {
                    if(e.pageY >= denWall.top._y - 15 && e.pageY <= denWall.bottom._y - 30) {
                        DTD.player.attr({
                            y: e.pageY
                        });
                    }
                }
            });
            $("#menu").on('click', function() {
				Crafty.pause();
			});
			RoundOne.play();
        });
    });

    Crafty.scene("titleScreen");
});
