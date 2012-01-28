Crafty.c("Bleed", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, bleed");
        this.attr({
            w: 55,
            h: 55,
            z: 1
        });
        this.animate("bleed", 0, 0, 11);

        this.bind("EnterFrame", function() {
            this.attr({
                x: this._creature.x,
                y: this._creature.y
            });
        });
    },
    attachCreature: function(creature) {
        this._creature = creature;
        this.animate("bleed", 10);
        this.delay(function() {
            this.destroy();
        }, 500);
    }
});

Crafty.c("Gold", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Mouse, gold");
        this.attr({

            w: 35,
            h: 35,
            z: 1
        });
        this.animate("tusk", 0, 0, 1);
        this.delay(function() {
            this.destroy();
        }, 2500);
        this.bind("MouseOver", function() {
            this.destroy();
        });
    }
});

Crafty.c("DenWallLeft", {
    init: function() {
        this.addComponent("2D, Canvas, Collision");
        this.attr({
            x: 0,
            y: 90,
            w: 1,
            h: 420,
            z: 1
        });
    }
});

Crafty.c("DenWallRight", {
    init: function() {
        this.addComponent("2D, Canvas, Collision");
        this.attr({
            x: 65,
            y: 90,
            w: 1,
            h: 420,
            z: 1
        });
    }
});

Crafty.c("DenWallTop", {
    init: function() {
        this.addComponent("2D, Canvas, Collision");
        this.attr({
            x: 0,
            y: 90,
            w: 65,
            h: 1,
            z: 1
        });
    }
});

Crafty.c("DenWallBottom", {
    init: function() {
        this.addComponent("2D, Canvas, Collision");
        this.attr({
            x: 0,
            y: 90 + 420,
            w: 65,
            h: 1,
            z: 1
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
        	if(DefendTheDen.selectedSkill == "BearTrapSkill") {
        		DefendTheDen.skillBoundToMouse.attr({
        			x: this.x,
        			y: this.y
        		});
        	}
            /*if(DefendTheDen.wolf !== undefined) {
             DefendTheDen.wolf.attr({
             y: this.y + 15
             });
             }*/
        });
        this.bind("MouseDown", function() {
        	DefendTheDen.skillBoundToMouse.destroy();
        	Crafty.e("BearTrap").attr({
                x: this.x,
                y: this.y
           });
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
        this.sprite(0,0,1,1);
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
        this.css("background", "url(img/menu-sprites.png)");
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

Crafty.c("ToogleSound", {
    init: function() {
        this.addComponent("2D, DOM, Mouse");
    }
});

Crafty.c("ToogleMusic", {
    init: function() {
        this.addComponent("2D, DOM, Mouse");
    }
});

Crafty.c("AttachSprite", {
    init: function() {
        this.bind("EnterFrame", function() {
            if(this._spriteComponent !== undefined) {
                this._spriteComponent.attr({
                    x: this.x - this._spriteComponent._mainComponentAttr.x,
                    y: this.y - this._spriteComponent._mainComponentAttr.y
                });
            }
        });
    },
    attachSprite: function(spriteComponent) {
        this._spriteComponent = spriteComponent;
        console.log(this._zIndex);
        if(this._zIndex) {
        	this._spriteComponent.attr({z : this._zIndex});
        }
    }
});
