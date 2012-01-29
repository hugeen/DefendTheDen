var allowPlayerMoves = function() {
    $(document).mousemove(function(e) {
        if(DTD.player != undefined) {
            if(!DTD.player._paused) {
                if(e.pageY >= 90 && e.pageY <= 480) {
                    DTD.player.attr({
                        y: e.pageY
                    });
                }
            }
        }
    });
};

Crafty.c("PlayerLife", {
    init: function() {
        this._baseLife = 100;
        this._modifier = 1;
        this._fullLife = this._baseLife * this._modifier;
        this._actualLife = this._fullLife;
        this.bind("EnterFrame", function() {

        });
    },
    takeDamage: function(type) {
        var damages = 0;
        switch(type) {
            case "wallReached":
                damages = 15;
                break;
            default:
                damages = 5;
                break;
        }
        this._actualLife = this._actualLife - damages;
        $("#lifeBarProgress").width(130 - ((this._fullLife - this._actualLife) * (130 / this._fullLife)));
        if(this._actualLife <= 0) {
        	youLoose();
			this.delay(function() {
				$(".youWin").remove();
				removeUI();
				loadScene("loose");
			},2000);
        }
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
            z: 17
        });
        this._mainComponentAttr = {
            x: 40,
            y: 60
        };
        this.animate("walkWolf", 0, 0, 1);
        this.animate("throwAxe", 1, 0, 3);
        this._walking = false;
    }
});

Crafty.c("Wolf", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, AttachSprite, PlayerLife");

        this.attr({
            x: 9,
            y: 90,
            w: 40,
            h: 40,
            z: 14
        });

        this.bind("EnterFrame", function() {
            if(this._wagon !== undefined) {
                this._wagon.attr({
                    x: this.x - 13,
                    y: this.y
                });
            }
        });
        this.attachSprite(Crafty.e("WolfSprite"));
        this.attachWagon(Crafty.e("Wagon"));
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
