
Crafty.c("NewGameMenuItem", {
    init: function() {
        this.addComponent("2D, DOM, Mouse");
        this.attr({
            w: 240,
            h: 54,
            x: 237,
            y: 316
        });
        this.css("background", "url(img/menu-sprites.png)");
        this.css("background-position", "0 0");
        this.css("z-index", "0");
        this.css("cursor", "pointer");
        this.bind("MouseOver", function() {
            this.css("background-position", "-240px 0");
        });
        this.bind("MouseOut", function() {
            this.css("background-position", "0 0");
        });
        this.bind("Click", function() {
            this.css("background-position", "-480px 0");
            Crafty.scene("newGame");
        });
    }
});

Crafty.c("AttachSprite", {
    init: function() {
        this.bind("EnterFrame", function() {
            if(this._spriteComponent !== undefined) {
                this._spriteComponent.attr({
                    x: this.x - this._spriteComponent._mainComponentAttr.x,
                    y: this.y - this._spriteComponent._mainComponentAttr.y
                });
            }
        });
    },
    attachSprite: function(spriteComponent) {
        this._spriteComponent = spriteComponent;
        if(this._zIndex) {
        	this._spriteComponent.attr({z : this._zIndex});
        }
    }
});
