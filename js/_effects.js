(function() {
    Crafty.c("Bleed", {

        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, bleed");
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
            this.addComponent("2D, Canvas, SpriteAnimation, dyingBleed");
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
