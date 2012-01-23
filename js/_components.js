Crafty.c("DenWallLeft", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Collision");
        this.attr({
            x: 0,
            y: 90,
            w: 1,
            h: 420,
            z: 1
        });
        this.color("#000");
    }
});

Crafty.c("DenWallRight", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Collision");
        this.attr({
            x: 65,
            y: 90,
            w: 1,
            h: 420,
            z: 1
        });
        this.color("#000");
    }
});

Crafty.c("DenWallTop", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Collision");
        this.attr({
            x: 0,
            y: 90,
            w: 65,
            h: 1,
            z: 1
        });
        this.color("#000");
    }
});

Crafty.c("DenWallBottom", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Collision");
        this.attr({
            x: 0,
            y: 90 + 420,
            w: 65,
            h: 1,
            z: 1
        });
        this.color("#000");
    }
});



Crafty.c("SkillButton", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Mouse, KeyBoard");
        this.attr({
            x: 10,
            y: 10,
            w: 30,
            h: 30,
            z: 1
        });
        this.color("#fff");

    }
});

Crafty.c("Cell", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Collision, Mouse");
        this.attr({
            w: 65,
            h: 70,
            z: 0
        });
        this.color("#000");
        this.bind("MouseOver", function() {
            if(DefendTheDen.wolf !== undefined) {
                DefendTheDen.wolf.attr({
                    y: this.y + 15
                })
            }
        });
    }
});

Crafty.c("Clouds", {
    init: function() {
        this.addComponent("2D, DOM");
        this._backgroundPos = 0;
        this.attr({
            w: DefendTheDen.viewPort.w,
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

Crafty.c("NewGameMenuItem", {
    init: function() {
        this.addComponent("2D, DOM, Mouse");
        this.attr({
            w: 240,
            h: 54,
            x: 237,
            y: 316
        });
        this.css("background", "url(img/menu-sprites.png)")
        this.css("background-position", "0 0");
        this.css("z-index", "0");
        this.css("cursor", "pointer");
        this.bind("MouseOver", function() {
            this.css("background-position", "-240px 0");
        });
        this.bind("MouseOut", function() {
            this.css("background-position", "0 0");
        });
        this.bind("Click", function() {
            this.css("background-position", "-480px 0");
            Crafty.scene("newGame");
        });
    }
});
