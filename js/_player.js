(function() {
    
    DTD.allowPlayerMoves = function() {
        $(document).mousemove(function(e) {
            if(DTD.player != undefined) {
                if(!DTD.player._paused) {
                    if(e.pageY >= 65 && e.pageY <= 450) {
                        DTD.player.attr({
                            y : e.pageY
                        });
                    }
                }
            }
        });
    };

    Crafty.c("PlayerLife", {
        init : function() {
            this._fullLife = 7;
            this._actualLife = this._fullLife;
        },
        takeDamage : function(type) {
            if(this.bleed !== undefined) {
                this.bleed.destroy();
            }
            this.bleed = Crafty.e("Bleed").attachCreature(this);
            var damages = 0;
            switch(type) {
                default:
                    damages = 1;
                    break;
            }
            this._actualLife = this._actualLife - damages;
            for(var i = 0; i < damages; i++) {
                $("#lifeBar .full").last().removeClass("full");
            }
            if(this._actualLife <= 0) {
                DTD.youLoose();
                this.delay(function() {
                    $(".youWin").remove();
                    DTD.removeUI();
                    if(DTD.gameType == "story") {
                        DTD.loadScene("loose");
                    } else {
                        if(DTD.currentRound._score > storage.endlessScore.get()) {
                            storage.endlessScore.set(DTD.currentRound._score);
                        }
                        Crafty.scene("titleScreen");
                    }
                }, 2000);
            }
        }
    });

    Crafty.c("PlayerEnergy", {
        init : function() {
            this._fullEnergy = 7;
            this._actualEnergy = this._fullEnergy;
            this.generateEnergy();

        },
        generateEnergy : function() {
            this.realDelay(function() {
                if(this._actualEnergy < 7) {
                    this._actualEnergy++;
                    $("#energyBar .empty").first().removeClass("empty").addClass("full regen");
                    this.realDelay(function() {
                        $("#energyBar .regen").removeClass("regen");
                    }, 4000);
                }
                this.generateEnergy();
            }, 5000);
        },
        consumeEnergy : function(type) {
            var cost = 0;
            switch(type) {
                case "blow":
                    cost = DTD.skillList["Blow"].stats[storage.axeSkill.get()].energyCost;
                    break;
                case "rock":
                    cost = DTD.skillList["DTD.ThrowingRock"].stats[storage.axeSkill.get()].energyCost;
                    break;
                default:
                    cost = 1;
                    break;
            }
            for(var i = 0; i < cost; i++) {
                $("#energyBar .full").last().removeClass("full").addClass("empty");
            }
            this._actualEnergy = this._actualEnergy - cost;
        }
    });

    Crafty.c("WolfSprite", {
        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, wolf");
            this.attr({
                x : 0,
                y : 90,
                w : 135,
                h : 135,
                z : 17
            });
            this._mainComponentAttr = {
                x : 50,
                y : 20
            };
            this.animate("walkWolf", 0, 0, 1);
            this.animate("throwAxe", 1, 0, 3);
            this.animate("blow", 4, 0, 7);
            this._walking = false;
        }
    });

    Crafty.c("Wolf", {
        init : function() {
            this.addComponent("2D, Canvas, Collision, AttachSprite, Keyboard, RealDelay, PlayerLife, PlayerEnergy");

            this.attr({
                x : 20,
                y : 90,
                w : 50,
                h : 90,
                z : 14
            });

            this.bind("EnterFrame", function() {
                if(this._wagon !== undefined) {
                    this._wagon.attr({
                        x : this.x - 23,
                        y : this.y + 35
                    });
                }
            });

            this.attachSprite(Crafty.e("WolfSprite"));
            this.attachWagon(Crafty.e("Wagon"));
            this.bind('KeyUp', function(e) {
                if(e.keyCode === Crafty.keys["ESC"]) {
                    Crafty.pause();
                }
            });
        },
        attachWagon : function(wagon) {
            this._wagon = wagon;
        }
    });
    
})();