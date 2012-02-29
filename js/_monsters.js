(function() {

    Crafty.c("PigSprite", {
        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, pig");
            this.attr({
                x : -150,
                y : -90,
                w : 115,
                h : 115,
            });
            this._mainComponentAttr = {
                x : 30,
                y : 20
            };
            this.animate("walk", 0, 0, 3);
            this.animate("walk", 38, -1);

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
            });
            this._mainComponentAttr = {
                x : 40,
                y : 20
            };
            this.animate("throwPie", 4, 0, 7);
            this.animate("walk", 0, 0, 3);
            this.animate("walk", 38, -1);
        }
    });

    Crafty.c("GrannySprite", {
        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, granny");
            this.attr({
                x : -150,
                y : -90,
                w : 200,
                h : 200,
            });
            this._mainComponentAttr = {
                x : 55,
                y : 50
            };
            this.animate("walk", 0, 0, 3);
            this.animate("startFire", 4, 0, 6);
            this.animate("fire", 6, 0, 7);
            this.animate("walk", 15, -1);
        }
    });

    Crafty.c("Granny", {
        init : function() {
            this.addComponent("Enemy");
            this._movingSpeed = 0.25;
            this._coinDropRate = 100;
            this._hitPoints = 94;
            this.realDelay(function() {
                this.shotgun();
            }, 2000);
            this._lineMargin = -30;
            this.attr({
                w : 55,
                h : 100
            });
            this.bind("dead", function() {
                if(DTD.gameType == "endless") {
                    DTD.currentRound.score(23);
                }
            });
        },
        shotgun : function() {
            if(!this._shot) {
                this._state = "stay";
                this._shot = true;
                this._spriteComponent.stop().animate("startFire", 20, 0);

                this.realDelay(function() {
                    this._spriteComponent.stop().animate("fire", 7, -1);
                }, 750);

                this.realDelay(function() {
                    Crafty.e("GrannyBolt").attr({
                        x : this.x - 30,
                        y : this.y + 10
                    });
                }, 800);

                this.realDelay(function() {
                    Crafty.e("GrannyBolt").attr({
                        x : this.x - 10,
                        y : this.y + 23
                    });
                }, 1200);

                this.realDelay(function() {
                    Crafty.e("GrannyBolt").attr({
                        x : this.x - 10,
                        y : this.y + 50
                    });
                }, 1600);

                this.realDelay(function() {
                    Crafty.e("GrannyBolt").attr({
                        x : this.x - 30,
                        y : this.y + 37
                    });
                }, 2000);

                this.realDelay(function() {
                    this._spriteComponent.stop().animate("walk", 38, -1);
                    this._state = "free";
                    this._shot = false;
                }, 2200);

                this.realDelay(function() {
                    this.shotgun();
                }, Crafty.math.randomInt(2000, 5000));

            }
        }
    });

    Crafty.c("Pig", {
        init : function() {
            this.addComponent("Enemy");
            this._movingSpeed = 0.45;
            this._coinDropRate = 65;
            this._hitPoints = 31;
            this.bind("dead", function() {
                if(DTD.gameType == "endless") {
                    DTD.currentRound.score(7);
                }
            });
        }
    });

    Crafty.c("Ridding", {
        init : function() {
            this.addComponent("Enemy");
            this._movingSpeed = 0.65;
            this._coinDropRate = 85;
            this._hitPoints = 19;
            this._throwPie = false;
            this.realDelay(function() {
                this.throwPie();
            }, Crafty.math.randomInt(1500, 4500));
            this.bind("dead", function() {
                if(DTD.gameType == "endless") {
                    DTD.currentRound.score(9);
                }
            });
        },
        throwPie : function() {
            if(!this._throwPie) {
                this._state = "stay";
                this._throwPie = true;
                this._spriteComponent.stop().animate("throwPie", 40, 0);

                this.realDelay(function() {
                    Crafty.e("RiddingPie").attr({
                        x : this.x - 30,
                        y : this.y + 20
                    });
                }, 800);

                this.realDelay(function() {
                    this._spriteComponent.stop().animate("walk", 38, -1);
                    this._state = "free";
                    this._throwPie = false;
                }, 1250);

                this.realDelay(function() {
                    this.throwPie();
                }, Crafty.math.randomInt(3000, 9500));
            }
        }
    });

    Crafty.c("Enemy", {
        init : function() {
            this.addComponent("2D, Canvas, Collision, Mouse, AttachSprite, RealDelay");
            this._state = "free";
            this._bumped = false;
            this._hitPoints = 100;
            this._movingSpeed = 0.45;
            this._coinDropRate = 50;
            this._lineMargin = 0;

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
                        this.move("e", 3.0);
                    }
                } else {
                    if(this._state != "dead") {
                        this.takeDamage(this._hitPoints);
                        DTD.player.takeDamage("wallReached");
                    }
                }
            });

            this.bind("Click", function() {
                DTD.skills.DTD.throwingAxeSkill.e.checkAction();
            });

            this.bind("dead", function() {
                this._state = "dead";
                DTD.currentRound._monstersDied++;
                storage.pigDied.set(storage.pigDied.get() + 1);
                if(DTD.rolling(this._coinDropRate)) {
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
                y : (90 + (line * 70) - 70) - 25 + this._lineMargin
            });
        },
        takeDamage : function(damages) {
            if(this._state != "dead") {
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
    
})();
