Crafty.c("ThrowingAxe", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, Tween, axe");
        this.attr({
            x: 32,
            y: 32,
            w: 32,
            h: 32
        });
        this.origin("center");
        this.bind("EnterFrame", function() {
            this.attr({
                rotation: this.rotation + 18
            });
            this.move("e", 10);
        });
    }
});

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

Crafty.c("Wolf", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Collision, Keyboard, Fourway, wolf");

        this.attr({
            x: 0,
            y: 90,
            z: 1
        });

        this.animate("walkWolf", 0, 0, 5);

        this.fourway(8);
        this.bind("EnterFrame", function() {
            if(isMultiwayPress(this) && !hitDenWalls(this)) {
                if(!this.isPlaying("walkWolf")) {
                    this.stop().animate("walkWolf", 15);
                }
            } else {
                this.stop();
            }
        });

        this.onHit("DenWallLeft", function() {
            this.x += this._speed;
        });
        this.onHit("DenWallRight", function() {
            this.x -= this._speed;
        });
        this.onHit("DenWallBottom", function() {
            this.y -= this._speed;
        });
        this.onHit("DenWallTop", function() {
            this.y += this._speed;
        });
    }
});

Crafty.c("Pig", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Collision, pig");

        this.attr({
            x: 650,
            y: 90,
            z: 1
        });

        this.animate("walk", 0, 0, 7);

        this.bind("EnterFrame", function() {

            if(!this.hit("DenWallRight")) {
                this.move("w", 1.5);
                if(!this.isPlaying("walk")) {
                    this.stop().animate("walk", 70);
                }
            } else {
                this.stop();
                this.destroy();
            }

        });
    },
    setToLine: function(line) {
        this.attr({
            y: 90 + (line * 70) - 70
        });
    }
});

Crafty.c("SkillButton", {
    init: function() {
        this.addComponent("2D, Canvas, Color, Mouse");
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
