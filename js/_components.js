(function() {

    Crafty.c("MenuItem", {
        init : function() {
            this.addComponent("2D, DOM, Mouse");
            this.attr({
                w : 240,
                h : 54,
                x : 237
            });
            this.css("background", "url(img/menu-sprites.png)");
            this.css("z-index", "0");
            this.css("cursor", "pointer");
        }
    });

    Crafty.c("GameTitle", {
        init : function() {
            this.addComponent("2D, DOM, Text");
            this.attr({
                w : DTD.viewPort.w,
                x : 0,
                y : 175
            });
            this.text("Defend The Den");
            this.css("text-shadow", "0 0 1px #000, 0 0 1px #000");
            this.css("font-family", "'IM Fell DW Pica SC', serif");
            this.css("color", "#fff");
            this.css("font-size", "42px");
            this.css("text-align", "center");
            this.css("cursor", "default");
        }
    });

    Crafty.c("EndlessMenuItem", {
        init : function() {
            this.addComponent("2D, DOM, Text, Mouse");
            this.attr({
                w : 140,
                h : 90,
                x : DTD.viewPort.w - 160,
                y : 40
            });
            this.text("Endless!");
            this.css("font-family", "'Bangers', cursive");
            this.css("text-shadow", "0 0 1px #000, 0 0 1px #000");
            this.textColor('#90c93c');
            this.css("font-size", "42px");
            this.css("text-align", "center");
            this.css("cursor", "pointer");
            this.bind("MouseOver", function() {
                this.textColor('#FFFFFF');
            });
            this.bind("MouseOut", function() {
                this.textColor('#90c93c');
            });
            this.bind("Click", function() {
                DTD.sceneMaker(true);
            });
        }
    });

    Crafty.c("CreditsMenuItem", {
        init : function() {
            this.addComponent("2D, DOM, Text, Mouse");
            this.attr({
                w : 140,
                h : 90,
                x : 30,
                y : 40
            });
            this.text("Credits");
            this.css("font-family", "'Bangers', cursive");
            this.css("text-shadow", "0 0 1px #000, 0 0 1px #000");
            this.textColor('#90c93c');
            this.css("font-size", "36px");
            this.css("text-align", "left");
            this.css("cursor", "pointer");
            this.bind("MouseOver", function() {
                this.textColor('#FFFFFF');
            });
            this.bind("MouseOut", function() {
                this.textColor('#90c93c');
            });
            this.bind("Click", function() {
                Crafty.scene("credits");
            });
        }
    });

    Crafty.c("EndlessScore", {
        init : function() {
            this.addComponent("2D, DOM, Text");
            this.attr({
                w : 140,
                h : 90,
                x : DTD.viewPort.w - 160,
                y : 40 + 40
            });
            this.text(storage.endlessScore.get());
            this.css("font-family", "'Over the Rainbow', cursive");
            this.textColor('#FFFFFF');
            this.css("font-size", "28px");
            this.css("text-align", "center");
            this.css("cursor", "default");
        }
    });

    Crafty.c("NewGameMenuItem", {
        init : function() {
            this.addComponent("MenuItem");
            this.attr({
                y : 316
            });
            this.css("background-position", "-240px 0");
            this.bind("MouseOver", function() {
                this.css("background-position", "0 0");
            });
            this.bind("MouseOut", function() {
                this.css("background-position", "-240px 0");
            });
            this.bind("Click", function() {
                this.css("background-position", "-480px 0");
                storage.level.set(1);
                DTD.loadScene(storage.level.get());
            });
        }
    });

    Crafty.c("ContinueMenuItem", {
        init : function() {
            this.addComponent("MenuItem");
            this.attr({
                y : 370
            });
            this.css("background-position", "-240px 54px");
            this.bind("MouseOver", function() {
                this.css("background-position", "0 54px");
            });
            this.bind("MouseOut", function() {
                this.css("background-position", "-240px 54px");
            });
            this.bind("Click", function() {
                this.css("background-position", "-480px 54px");
                DTD.loadScene(storage.level.get());
            });
        }
    });

    Crafty.c("AttachSprite", {
        init : function() {
            this.bind("EnterFrame", function() {
                if(this._spriteComponent !== undefined) {
                    this._spriteComponent.attr({
                        x : this.x - this._spriteComponent._mainComponentAttr.x,
                        y : this.y - this._spriteComponent._mainComponentAttr.y
                    });
                }
            });
        },
        attachSprite : function(spriteComponent) {
            this._spriteComponent = spriteComponent;
            if(this._zIndex) {
                this._spriteComponent.attr({
                    z : this._zIndex
                });
            }
            this.trigger("SpriteAttached");
        }
    });

})();
