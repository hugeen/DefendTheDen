Crafty.c("PigSprite", {
	init : function() {
		this.addComponent("2D, Canvas, SpriteAnimation, pig");
		this.attr({
			x : -150,
			y : -90,
			w : 115,
			h : 115,
			z : 1
		});
		this._mainComponentAttr = {
			x : 30,
			y : 20
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

Crafty.c("RiddingSprite", {
	init : function() {
		this.addComponent("2D, Canvas, SpriteAnimation, ridding");
		this.attr({
			x : -150,
			y : -90,
			w : 115,
			h : 115,
			z : 1
		});
		this._mainComponentAttr = {
			x : 30,
			y : 20
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
	init : function() {
		this.addComponent("Enemy");
		this._movingSpeed = 0.45;
		this._coinDropRate = 35;
		this._hitPoints = 120;
	}
});

Crafty.c("Ridding", {
	init : function() {
		this.addComponent("Enemy");
		this._movingSpeed = 0.65;
		this._coinDropRate = 65;
		this._hitPoints = 80;
		this._throwPie = false;
		this.delay(function() {
			this.throwPie();
		}, 1750);
		this.bind("SpriteAttached", function() {
			this._spriteComponent.animate("throwPie", 4, 0, 8);
		});
	},
	throwPie : function() {
		this._state = "stay";
		this._throwPie = true;
		this._spriteComponent.stop().animate("throwPie", 40, 0);
		this.delay(function() {
			Crafty.e("RiddingPie").attr({
				x : this.x-30,
				y : this.y+20
			});
		}, 900);
		this.delay(function() {
			this._spriteComponent.stop().animate("walk", 38, 1);
			this._state = "free";
			this._throwPie = false;
			this.delay(function() {
				this.throwPie();
			}, 1750)
		}, 1250);
	}
});

Crafty.c("Enemy", {
	init : function() {
		this.addComponent("2D, Canvas, Collision, Mouse, AttachSprite, Gravity");
		this._state = "free";
		this._bumped = false;
		this._hitPoints = 100;
		this._movingSpeed = 0.45;
		this._coinDropRate = 50;

		this.attr({
			x : 650,
			y : -90,
			w : 40,
			h : 70,
			z : 1
		});

		this.bind("EnterFrame", function() {
			if(!this.hit("Wires")) {
				if(this._state == "free") {
					this.move("w", this._movingSpeed);
				} else if(this._state == "bumped") {
					this.move("e", 4.5);
				}
			} else {
				if(this._state != "dead") {
					this.takeDamage(this._hitPoints);
					DTD.player.takeDamage("wallReached");
				}
			}
		});

		this.bind("MouseOver", function() {
			if(DTD.selectedSkill == "ThrowingAxeSkill") {
				$("body").css("cursor", "url(img/attack-cursor.png),auto");
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
			this._state = "dead";
			Crafty.audio.play("pigDie");

			currentRound._monstersDied++;
			storage.pigDied.set(storage.pigDied.get() + 1);
			if(rolling(this._coinDropRate)) {
				Crafty.e("Gold").attr({
					x : Crafty.math.randomInt(this.x - 10, this.x + this.w + 10),
					y : Crafty.math.randomInt(this.y - 10, this.y + this.h + 10),
					z : 20
				});
			}
			this.delay(function() {
				this._spriteComponent.destroy();
				this.destroy();
			}, 75);
		});
	},
	bump : function() {
		if(!this._bumped) {
			this._state = "bumped";
			this.delay(function() {
				this._state = "free";
			}, 750);
		}
	},
	setToLine : function(line) {
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
			y : (90 + (line * 70) - 70) - 25
		});
	},
	takeDamage : function(damages) {
		if(this._state != "dead") {
			Crafty.audio.play("wound");

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
