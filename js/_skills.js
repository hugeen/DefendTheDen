
Crafty.c("SkillButton", {
    init: function() {
        this.addComponent("2D, Canvas, Mouse, KeyBoard");
        this.attr({
            x: 10,
            y: 10,
            w: 50,
            h: 50,
            z: 1
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
        new Sound(soundResources.throwing, { volume: 40, destroyIn: 1000 }).play();
    },
});

Crafty.c("ThrowingAxeSkill", {
    init: function() {
        this.addComponent("SkillButton, Image");
        this.bind('KeyUp', function(e) {
            if(e.keyCode === Crafty.keys["1"]) {
                this.throwAxe();
            }
        });
        this.image("img/axe-sprite.png");
        this.bind("Click", function() {

        });
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
    }
});
