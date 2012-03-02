(function() {
    Crafty.c("Bleed", {

        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, Delay, bleed");
            this.attr({
                w : 55,
                h : 55,
                z : 36
            });
            this.animate("bleed", 0, 0, 11);

            this.bind("EnterFrame", function() {
                this.attr({
                    x : this._creature.x,
                    y : this._creature.y
                });
            });
            Crafty.audio.play("wound");
        },
        attachCreature : function(creature) {
            this._creature = creature;
            this.animate("bleed", 10);
            this.delay(function() {
                this.destroy();
            }, 500);
        }
    });

    Crafty.c("DyingBleed", {

        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, Delay, dyingBleed");
            this.attr({
                x : -115,
                y : -115,
                w : 115,
                h : 115,
                z : 36
            });
            this.animate("bleed", 0, 0, 10);

            this.bind("EnterFrame", function() {
                this.attr({
                    x : this._creature.x,
                    y : this._creature.y - 30
                });
            });
            Crafty.audio.play("wound");
        },
        attachCreature : function(creature) {
            this._creature = creature;
            this.animate("bleed", 10);
            this.delay(function() {
                this.destroy();
            }, 500);
        }
    });
})();
