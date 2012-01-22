window.onload = (function() {

    // Initialize Crafty
    Crafty.init(710, 580);
    var renderGameTitle = function() {
        return Crafty.e("2D, DOM, Text, Mouse").attr({
            w: 100,
            h: 20,
            x: 150,
            y: 120
        }).css("color", "#fff").css("cursor", "pointer").text("Defend the Den").bind("Click", function(obj) {
            Crafty.scene("newGame");
        });
    }

    Crafty.sprite(53, "img/pig-sprite.png", {
        pig: [0, 0, 1, 1]
    });

    Crafty.sprite(48, "img/wolf-sprite.png", {
        wolf: [0, 0, 1, 2]
    });
    Crafty.c("Missile", {
        init: function() {
            this.addComponent("2D, Canvas, Color, Collision, Tween");
            this.color("#000");
            this.attr({
                alpha: 1.0,
                x: 90,
                y: 90,
                w: 5,
                h: 5
            });
            this.tween({
                alpha: 0.0,
                rotation: -900,
                x: 500,
                y: 90
            }, 50);
        }
    });
    Crafty.c("DenWall", {
        init: function() {
            this.addComponent("2D, Canvas, Color, Collision");
            this.attr({
                x: 0,
                y: 90,
                w: 65,
                h: 420,
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

                if(this.isDown("UP_ARROW") || this.isDown("W") || this.isDown("LEFT_ARROW") || this.isDown("A") || this.isDown("RIGHT_ARROW") || this.isDown("D") || this.isDown("DOWN_ARROW") || this.isDown("S")) {
                    if(!this.isPlaying("walkWolf")) {
                        this.stop().animate("walkWolf", 15);
                    }
                } else {
                    this.stop();
                }

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

                if(!this.hit("DenWall")) {
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

    Crafty.scene("titleScreen", function() {
        renderGameTitle();
    })

    Crafty.scene("newGame", function() {
        console.log("newGame");
        Crafty.load(["img/pig-sprite.png"], function() {

            var denWall = Crafty.e("DenWall");

            Crafty.e("Pig").setToLine(1);
            Crafty.e("Pig").setToLine(2);
            Crafty.e("Pig").setToLine(3);
            Crafty.e("Pig").setToLine(4);
            Crafty.e("Wolf");
            Crafty.e("Missile");
        });
    });

    Crafty.scene("titleScreen");

});
