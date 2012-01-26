Crafty.c("Pig", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Collision, Mouse, pig");

        this._hitPoints = 100;

        this.attr({
            x: 650,
            y: 90,
            z: 1
        });
		
        this.animate("walk", 0, 0, 3);
		
        this.bind("EnterFrame", function() {
			
            if(!this.hit("DenWallRight")) {
            	this.move("w", 0.60);
                if(!this.isPlaying("walk")) {
                    this.animate("walk", 30, -1);
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
        this.bind("dead", function() {
        	console.log("dead");
        	Crafty.e("Gold").attr({ x: this.x, y: this.y });
        	this.destroy();
        });
    },
    setToLine: function(line) {
        this.attr({
            y: 90 + (line * 70) - 70
        });
    },
    takeDamage: function(damages) {
    	new Sound(soundResources.wound, { destroyIn: 1000 }).play();

    	if(this.bleed !== undefined) {
    		this.bleed.destroy();
    	}
    	this.bleed = Crafty.e("Bleed").attachCreature(this);
        this._hitPoints -= damages;
        if(this._hitPoints < 1) {
        	this.trigger("dead");
            
        }
    }
});