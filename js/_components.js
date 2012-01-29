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
        	if(DTD.selectedSkill == "BearTrapSkill") {
        		DTD.skillBoundToMouse.attr({
        			x: this.x,
        			y: this.y
        		});
        	}
        });
        this.bind("MouseDown", function() {
        	DTD.skillBoundToMouse.destroy();
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
        if(this._zIndex) {
        	this._spriteComponent.attr({z : this._zIndex});
        }
    }
});
