Crafty.c("PigSprite", {
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, pig");
        this.attr({
        	x: 0,
            y: 90,
            w: 115,
            h: 115,
            z: 1
        });
        this._mainComponentAttr = {
            x: 30,
            y: 20
        };     
        this.animate("walk", 0, 0, 3);
	    this.animate("walk", 38, 1);

        this.bind("EnterFrame", function() {
        	if(this._frame.frame==4) {
        		this._frame.current=0;
        		this._frame.frame=0;
        	}	
	        
        });
    }
});

Crafty.c("Pig", {
    init: function() {
        this.addComponent("2D, Canvas, Collision, Mouse, AttachSprite");
		this._state = "free";
        this._hitPoints = 100;
		this._movingSpeed = 0.45;
        this.attr({
            x: 650,
            y: 90,
            w: 40,
            h: 70,
            z: 1
        });
		
        this.bind("EnterFrame", function() {
            if(!this.hit("DenWallRight")) {
            	if(this._state == "free") {
            		this.move("w", this._movingSpeed);
            	}
            } else {
            	this._spriteComponent.stop();
            	this._spriteComponent.destroy();
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
                DefendTheDen.skills.throwingAxeSkill.e.checkAction();
            }
        });
        
        this.bind("dead", function() {
        	Crafty.e("Gold").attr({ x: this.x, y: this.y });
        	this._spriteComponent.destroy();
        	this.destroy();
        });
        
    },
    setToLine: function(line) {
        this.attr({
            y: (90 + (line * 70) - 70)-15
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