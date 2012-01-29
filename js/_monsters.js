Crafty.c("PigSprite", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, pig");
        this.attr({
            x: 0,
            y: 90,
            w: 115,
            h: 115,
            z: 1
        });
        this._mainComponentAttr = {
            x: 30,
            y: 20
        };
        this.animate("walk", 0, 0, 3);
        this.animate("walk", 38, 1);

        this.bind("EnterFrame", function() {
            if(this._frame.frame == 4) {
                this._frame.current = 0;
                this._frame.frame = 0;
            }

        });
        
    }
});

Crafty.c("Pig", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, Mouse, AttachSprite");
        this._state = "free";
        this._hitPoints = 100;
        this._movingSpeed = 0.45;
        this.attr({
            x: 650,
            y: 90,
            w: 40,
            h: 70,
            z: 1
        });

        this.bind("EnterFrame", function() {
            if(!this.hit("DenWallRight")) {
                if(this._state == "free" && !this._paused) {
                    this.move("w", this._movingSpeed);
                }
            } else {
            	if(this._state != "dead") {
	            	this.takeDamage(this._hitPoints);
	            	DTD.player.takeDamage();
            	}
            }
        });

        this.bind("MouseOver", function() {
            if(DTD.selectedSkill == "ThrowingAxeSkill") {
                $("body").css("cursor", "url(img/axe-sprite.png),auto");
            }
        });

        this.bind("MouseOut", function() {
            $("body").css("cursor", "auto");
        });

        this.bind("Click", function() {
            if(DTD.selectedSkill == "ThrowingAxeSkill") {
                DTD.skills.throwingAxeSkill.e.checkAction();
            }
        });

        this.bind("dead", function() {
        	new Sound(soundResources.pigDie, {
                destroyIn: 1000
            }).play();
            this._state = "dead";
            storage.pigDied.set(storage.pigDied.get() + 1);
            Crafty.e("Gold").attr({
                x: Crafty.randRange(this.x - 10, this.x + this.w + 10),
                y: Crafty.randRange(this.y - 10, this.y + this.h + 10),
                z: 20
            });

            this.delay(function() {
                this._spriteComponent.destroy();
                this.destroy();
            }, 75);
        });
    },
    setToLine: function(line) {
        if(line == 6)
            var zIndex = 0;
        switch(line) {
            case 6:
                zIndex = 11;
                break;
            case 5:
                zIndex = 9;
                break;
            case 4:
                zIndex = 7;
                break;
            case 3:
                zIndex = 5;
                break;
            case 2:
                zIndex = 3;
                break;
            case 1:
                zIndex = 1;
                break;
        }
        this._zIndex = zIndex;
        this.attr({
            y: (90 + (line * 70) - 70) - 25
        });
    },
    takeDamage: function(damages) {
        if(this._state != "dead") {
            new Sound(soundResources.wound, {
                destroyIn: 1000
            }).play();

            if(this.bleed !== undefined) {
                this.bleed.destroy();
            }
            this._hitPoints -= damages;
            if(this._hitPoints < 1) {
                this.bleed = Crafty.e("DyingBleed").attachCreature(this);
                this.trigger("dead");
            } else {
                this.bleed = Crafty.e("Bleed").attachCreature(this);
            }
        }

    }
});
