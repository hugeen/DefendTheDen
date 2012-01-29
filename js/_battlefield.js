
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
