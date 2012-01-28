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
        this.animate("throwAxe", 1, 0, 3);
        this._walking = false;
        this.bind("EnterFrame", function() {
        	/*if(!this.isPlaying("throwAxe") && this._isThrowing) {
        		console.log("coucou");
        		this.stop().animate("throwAxe", 12);
        	} else {
        		if(!this.isPlaying("walkWolf") && this._walking) {
	                this.stop().animate("walkWolf", 15);
	            } else {
	                this.stop();
	            }
        	}*/
        });
    }
});

Crafty.c("Wolf", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, Keyboard, Fourway, AttachSprite");

        this.attr({
            x: 0,
            y: 90,
            w: 40,
            h: 40,
            z: 1
        });

        this.fourway(8);
        this.bind("EnterFrame", function() {
            if(this._wagon !== undefined) {
                this._wagon.attr({
                    x: this.x-13,
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
    },
    throwAxe: function() {
        Crafty.e("ThrowingAxeSkill").attr({
            x: this.x,
            y: this.y
        });
    },
    attachWagon: function(wagon) {
        this._wagon = wagon;
    }
});
