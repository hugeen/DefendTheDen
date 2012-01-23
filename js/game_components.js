Crafty.c("SkillBar");
Crafty.c("ThrowingAxe", {
    init: function() {
        this._used = false;
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
        this.onHit("Pig", function(o) {
        	
            o[0].obj.setDamage(Crafty.randRange(100, 125));
            this.destroy();
        });
        this.bind("EnterFrame", function() {
            if(!isInViewPort(this)) {
                this.destroy();
            }
        });
    },
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

Crafty.c("WolfSprite", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, wolf");
        this.attr({
            x: 0,
            y: 90,
            w: 135,
            h: 135,
            z: 1
        });
        this._mainComponentAttr = {
        	x: 40,
        	y: 60
        };
        this.animate("walkWolf", 0, 0, 1);
        this._walking = false;
        this.bind("EnterFrame", function() {
            if(!this.isPlaying("walkWolf") && this._walking) {
                this.stop().animate("walkWolf", 15);
            } else {
                this.stop();
            }
        });
    }
});
Crafty.c("Wolf", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, Keyboard, Fourway");
        
        this.attr({
            x: 0,
            y: 90,
            w: 40,
            h: 40,
            z: 1
        });

        this.fourway(8);
        this.bind("EnterFrame", function() {
        	if(this._spriteComponent !== undefined) {
        		this._spriteComponent.attr({
        			x: this.x,
        			y: this.y
        		});
        	}
            if(isMultiwayPress(this) && !hitDenWalls(this)) {
                if(this._spriteComponent !== undefined) {
                    this._spriteComponent._walking = true;
                }
            } else {
                this._spriteComponent._walking = false;
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

        this._hitPoints = 100;

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
    },
    setDamage: function(damages) {
        this._hitPoints -= damages;
        if(this._hitPoints < 1) {
            this.destroy();
        }
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

Crafty.c("ThrowingAxeSkill", {
    init: function() {
        this.addComponent("SkillButton");
        this.bind('KeyUp', function(e) {
            if(e.keyCode === Crafty.keys["1"]) {
                if(this._wolf !== undefined) {
                    Crafty.e("ThrowingAxe").attr({
                        x: this._wolf.x,
                        y: this._wolf.y
                    });
                }
            }
        });
        this.bind("Click", function() {
            if(this._wolf !== undefined) {
                Crafty.e("ThrowingAxe").attr({
                    x: this._wolf.x,
                    y: this._wolf.y
                });
            }
        });
    },
    bindWolf: function(wolf) {
        this._wolf = wolf;
    }
});

Crafty.c("PlaceTrapSkill", {
    init: function() {
        this.addComponent("SkillButton");
        this.bind('KeyUp', function(e) {
            if(e.keyCode === Crafty.keys["2"]) {

            }
        });
        this.bind("Click", function() {

        });
        this.color("#ccc");
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
