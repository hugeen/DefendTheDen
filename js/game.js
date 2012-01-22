window.onload = (function() {

    // Initialize Crafty
    Crafty.init(710, 580);
    
    var renderGameTitle = function() {
        return Crafty.e("2D, DOM, Text, Mouse").attr({
            w: 100,
            h: 20,
            x: 150,
            y: 120
        }).css("color", "#fff").css("cursor", "pointer").text("Defend the Den").bind("Click", function(obj) {
            Crafty.scene("newGame");
        });
    }
    

    Crafty.scene("titleScreen", function() {
        renderGameTitle();
    })

    Crafty.scene("newGame", function() {
        console.log("newGame");
        Crafty.load(["img/pig-sprite.png"], function() {

            var denWall = Crafty.e("DenWall");

            Crafty.e("Pig").setToLine(1);
            Crafty.e("Pig").setToLine(2);
            Crafty.e("Pig").setToLine(3);
            Crafty.e("Pig").setToLine(4);
            Crafty.e("Wolf");
            Crafty.e("Missile");
        });
    });

    Crafty.scene("titleScreen");

});
