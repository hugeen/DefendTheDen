Crafty.c("Pig", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Collision, Mouse, pig");

        this._hitPoints = 100;

        this.attr({
            x: 650,
            y: 90,
            z: 1
        });

        this.animate("walk", 0, 0, 7);

        this.bind("EnterFrame", function() {

            if(!this.hit("DenWallRight")) {
                this.move("w", 0.75);
                if(!this.isPlaying("walk")) {
                    this.stop().animate("walk", 70);
                }
            } else {
                this.stop();
                this.destroy();
            }

        });
        this.bind("MouseOver", function() {
            if(DefendTheDen.selectedSkill == "ThrowingAxeSkill") {
                $("body").css("cursor", "url(img/axe-sprite.png),auto");
            }
        });
        this.bind("MouseOut", function() {
            $("body").css("cursor", "auto");
        });
        this.bind("Click", function() {
            if(DefendTheDen.selectedSkill == "ThrowingAxeSkill") {
                DefendTheDen.throwingAxeSkill.throwAxe();
            }
        });
    },
    setToLine: function(line) {
        this.attr({
            y: 90 + (line * 70) - 70
        });
    },
    setDamage: function(damages) {
        this._hitPoints -= damages;
        if(this._hitPoints < 1) {
            this.destroy();
        }
    }
});