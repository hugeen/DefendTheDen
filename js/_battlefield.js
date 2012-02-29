(function() {

    DTD.makeBattlefield = function() {
        Crafty.e("GrassField");
        Crafty.e("UnderRails");
        Crafty.e("SideRails");
        Crafty.e("EarthBackground");
        Crafty.e("SkyBackground");
        Crafty.e("Wires");
        Crafty.e("WindGravity");
        for(var i = 1; i <= 6; i++) {
            DTD.grassLine(i);
        }
        DTD.makeMatrix();
    };

    DTD.buildUI = function() {
        $("body").append('' + '<div id="pause" class="battleFieldUI"></div><a id="menu" href="#" class="battleFieldUI">' + '<span class="battleFieldUI">Menu</span>' + '</a>' + '<div id="portrait" class="battleFieldUI">' + '<div id="lifeBar" class="battleFieldUI">' + '</div>' + '<div id="energyBar" class="battleFieldUI">' + '</div>' + '<div id="goldCount" class="battleFieldUI">' + storage.goldCoins.get() + '</div>' + '<div id="goldCoin" class="battleFieldUI"></div>' + '</div>' + '<div id="levelNumber" class="battleFieldUI">LEVEL <span class="battleFieldUI">~</span></div>' + '<div id="progressBarBelow" class="battleFieldUI">' + '<div id="progressBar" class="battleFieldUI"></div>' + '</div>' + '</div>');

        for(var i = 0; i < 7; i++) {
            $("#lifeBar").append("<div class='full' class='battleFieldUI'></div>");
            $("#energyBar").append("<div class='full' class='battleFieldUI'></div>");
        }
        for(var i = 0; i < 20; i++) {
            $("#progressBar").append("<div class='empty' class='battleFieldUI'></div>");
        }

        $("#pause").hide();
        $("#pause").html('' + '<a id="menuPauseResume">Resume game</a>' + '<a id="menuPauseBackToMain">Back to main menu</a>' + '');
        $("#menu").on('click', function() {
            Crafty.pause();
        });
    };

    DTD.removeUI = function() {
        $(".battleFieldUI").remove();
    };

    DTD.grassLine = function(line) {
        var component = "grassLight";
        var yBase = 125;
        var xBase = 75;
        var hBase = 70;
        var wBase = 157;
        var yNew = 125 + (70 * (line - 1));

        var zIndex = line * 2;
        var component = (line % 2) ? "grassLight" : "grassDark";

        for(var i = 0; i <= 4; i++) {
            Crafty.e("DTD.grassLine").addComponent(component).attr({
                x : 110 + (yBase * i),
                y : yNew,
                z : zIndex
            });
        }

    };

    Crafty.c("WindGravity", {
        init : function() {
            this.addComponent("2D, Canvas");
            this.attr({
                w : 1,
                h : DTD.viewPort.h,
                x : DTD.viewPort.w,
                y : 0,
                z : 0
            });
        }
    });

    Crafty.c("GrassField", {
        init : function() {
            this.addComponent("2D, Canvas, Image");
            this.attr({
                w : DTD.viewPort.w,
                h : DTD.viewPort.h,
                x : 0,
                y : 0,
                z : 0
            });
            this.image("img/bg-lines.png", "no-repeat");
        }
    });

    Crafty.c("SideRails", {
        init : function() {
            this.addComponent("2D, Canvas, Sprite, rails");
            this.attr({
                w : 74,
                h : 580,
                x : 0,
                y : 0,
                z : 0
            });
        }
    });

    Crafty.c("EarthBackground", {
        init : function() {
            this.addComponent("2D, Canvas, Image");
            this.attr({
                w : DTD.viewPort.w,
                h : DTD.viewPort.h,
                x : 0,
                y : 0,
                z : 13
            });
            this.image("img/background-earth.png", "no-repeat");
        }
    });

    Crafty.c("SkyBackground", {
        init : function() {
            this.addComponent("2D, Canvas, Image");
            this.attr({
                w : DTD.viewPort.w,
                h : DTD.viewPort.h,
                x : 0,
                y : 0,
                z : 0
            });
            this.image("img/background-sky.png", "no-repeat");
        }
    });

    Crafty.c("DTD.grassLine", {
        init : function() {
            this.addComponent("2D, Canvas, Sprite");
            this.attr({
                w : 157,
                h : 157
            });
        }
    });

    Crafty.c("UnderRails", {
        init : function() {
            this.addComponent("2D, Canvas, Sprite, underRails");
            this.attr({
                w : 167,
                h : 668,
                x : -20,
                y : 35
            });
        }
    });

    Crafty.c("Wires", {
        init : function() {
            this.addComponent("2D, Canvas, Collision");
            this.attr({
                w : 22,
                h : 420,
                x : 70,
                y : 85,
                z : 16
            });
            Crafty.e("WiresSprite");
        }
    });

    Crafty.c("WiresSprite", {
        init : function() {
            this.addComponent("2D, Canvas, Sprite, wires");
            this.attr({
                w : 42,
                h : 420,
                x : 70,
                y : 85,
                z : 16
            });
        }
    });

    Crafty.c("Gold", {
        init : function() {
            this.addComponent("2D, Canvas, Mouse, RealDelay, gold");
            this.attr({
                w : 16,
                h : 16,
                z : 35
            });
            this.bind("MouseOver", function() {
                Crafty.e("GoldFade").attr({
                    x : this.x,
                    y : this.y
                });
                this.destroy();
                DTD.updateGolds();
                Crafty.audio.play("money");
            });
            this.realDelay(function() {
                if(DTD.gameType == "endless") {
                    DTD.currentRound.score(4);
                }
                this.destroy();
            }, 2500);
        }
    });

    Crafty.c("GoldFade", {
        init : function() {
            this.addComponent("2D, Canvas, SpriteAnimation, Mouse, goldFade");
            this.attr({
                w : 16,
                h : 16,
                z : 35
            });
            this.animate("goldFade", 0, 0, 3);
            this.animate("goldFade", 35, 0);
            this.delay(function() {
                this.destroy();
            }, 750);
        }
    });

    Crafty.c("Cell", {
        init : function() {
            this.addComponent("2D, Canvas, Collision, Mouse");
            this.attr({
                w : 65,
                h : 70,
                z : 0
            });
        }
    });

    Crafty.c("Wagon", {
        init : function() {
            this.addComponent("2D, Canvas, Sprite, Mouse, wagon");
            this.attr({
                w : 81,
                h : 81,
                x : 0,
                y : 0,
                z : 13
            });
            this.sprite(0, 0, 1, 1);
        }
    });

    Crafty.c("Clouds", {
        init : function() {
            this.addComponent("2D, DOM");
            this._backgroundPos = 0;
            this.attr({
                w : DTD.viewPort.w,
                h : 114,
                x : 0,
                y : 0
            });
            this.css("background", "url(img/clouds.png)");
            this.css("z-index", "0");
            this.bind("EnterFrame", function() {
                this._backgroundPos += 0.5;
                this.css("background-position", Math.ceil(this._backgroundPos) + "px 0");
            });
        }
    });

})();
