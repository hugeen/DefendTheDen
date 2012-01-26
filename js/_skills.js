Crafty.c("SkillButton", {
    init: function() {
        this.addComponent("2D, Canvas, Mouse, KeyBoard, Sprite, skill");
        this.attr({
            x: 10,
            y: 10,
            w: 44,
            h: 44,
            z: 1
        });
        this.cooldown = 0.5;
        this.bind("MouseDown", function() {
            this.sprite(1, 0, 1, 1);
        });
        this.bind("MouseUp", function() {
            this.sprite(0, 0, 1, 1);
        });
		this.coolDownStart = 0;
		this.coolDownFinish = 0;
		this.cdon = false;
        this._coolDownCount = Crafty.e("2D, Canvas, skillCooldown").attr({
            x: this.x,
            y: this.y,
            w: this.w,
            h: 0,
            z: 6
        });
        
        this.bind("EnterFrame", function() {
        	if(this.cdon) {
				var newH = (this.coolDownFinish-parseInt(new Date().getTime(),10))*44/(1000*this.cooldown);
				if(newH < 0 ) {
					this.cdon = false;
					newH = 0;
				}
				this._coolDownCount.attr({ h:  newH});
			}
        });

    }
});
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
            o[0].obj.takeDamage(Crafty.randRange(25, 50));
            this.destroy();
        });
        this.bind("EnterFrame", function() {
            if(!isInViewPort(this)) {
                this.destroy();
            }
        });
        new Sound(soundResources.throwing, {
            volume: 40,
            destroyIn: 1000
        }).play();
    }
});

Crafty.c("ThrowingAxeSkill", {
    init: function() {
        this.addComponent("SkillButton");
        this.cooldown = 0.625;
        this.bind('KeyUp', function(e) {
            if(e.keyCode === Crafty.keys["1"]) {
            	if(!this.cdon) {
	                this.throwAxe();
	                this.sprite(0, 0, 1, 1);
					this.coolDownStart = parseInt(new Date().getTime(),10);
					this.coolDownFinish = parseInt(new Date().getTime()+(this.cooldown*1000),10);
					this.cdon = true;
				}
            }
        });
        this.bind('KeyDown', function(e) {
            if(e.keyCode === Crafty.keys["1"]) {
                this.sprite(1, 0, 1, 1);
            }
        });
        this.bind("Click", function() {

        });
        this.bindVisual();
        
    },
    bindWolf: function(wolf) {
        this._wolf = wolf;
    },
    throwAxe: function() {
        if(this._wolf !== undefined) {
            DefendTheDen.selectedSkill = "ThrowingAxeSkill";
            Crafty.e("ThrowingAxe").attr({
                x: this._wolf.x,
                y: this._wolf.y
            });
        }
    },
    bindVisual: function() {
        this._skillVisual = Crafty.e("2D, Canvas, axe").attr({
            x: this.x + 6,
            y: this.y + 6,
            w: 32,
            h: 32,
            z: 5
        });

    }
});
