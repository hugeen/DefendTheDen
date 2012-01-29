var makeBattlefield = function() {
    Crafty.e("GrassField");
    Crafty.e("UnderRails");
    Crafty.e("SideRails");
    Crafty.e("EarthBackground");
    Crafty.e("SkyBackground");
    Crafty.e("Wires");
    grassLine(1);
    grassLine(2);
    grassLine(3);
    grassLine(4);
    grassLine(5);
    grassLine(6);
};
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
            x: 110 + (yBase * i),
            y: yNew,
            z: zIndex
        });
    }

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

Crafty.c("UnderRails", {
    init: function() {
        this.addComponent("2D, Canvas, Sprite, underRails");
        this.attr({
            w: 167,
            h: 668,
            x: -20,
            y: 35
        });
    }
});

Crafty.c("Wires", {
    init: function() {
        this.addComponent("2D, Canvas, Sprite, Collision, wires");
        this.attr({
            w: 42,
            h: 420,
            x: 70,
            y: 85,
            z: 16
        });
    }
});

Crafty.c("Gold", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Mouse, gold");
        this.attr({
            w: 16,
            h: 16,
            z: 1
        });
        this.animate("tusk", 0, 0, 1);
        this.delay(function() {
            this.destroy();
        }, 2500);
        this.bind("MouseOver", function() {
            this.destroy();
            updateGolds();
            new Sound(soundResources.goldCoin, {
                volume: 65,
                destroyIn: 2000
            }).play();
        });
    }
});

Crafty.c("Cell", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, Mouse");
        this.attr({
            w: 65,
            h: 70,
            z: 0
        });
        this.bind("MouseOver", function() {
            /*if(DTD.selectedSkill == "BearTrapSkill") {
                DTD.skillBoundToMouse.attr({
                    x: this.x,
                    y: this.y
                });
            }*/
        });
        this.bind("MouseDown", function() {
        	/*if(DTD.selectedSkill == "BearTrapSkill") {
	            Crafty.e("BearTrap").attr({
	                x: this.x,
	                y: this.y
	            });
         	}*/
        });
    }
});

Crafty.c("Wagon", {
    init: function() {
        this.addComponent("2D, Canvas, Sprite, Mouse, wagon");
        this.attr({
            w: 81,
            h: 81,
            x: 0,
            y: 0,
            z: 13
        });
        this.sprite(0, 0, 1, 1);
    }
});

Crafty.c("Clouds", {
    init: function() {
        this.addComponent("2D, DOM");
        this._backgroundPos = 0;
        this.attr({
            w: DTD.viewPort.w,
            h: 114,
            x: 0,
            y: 0
        });
        this.css("background", "url(img/clouds.png)");
        this.css("z-index", "0");
        this.bind("EnterFrame", function() {
            this._backgroundPos += 0.5;
            this.css("background-position", Math.ceil(this._backgroundPos) + "px 0");
        });
    }
});
