window.onload = (function() {

    // Initialize Crafty
    Crafty.init(710, 580);
    Crafty.c("TitleScreenButton", {

        init: function() {
            this.addComponent("2D, DOM, Text, Mouse");
            this.attr({
                w: 0,
                h: 0,
                x: 150,
                y: 120
            });

            this.text("Defend the Den");
            this.css("color", "#fff");
            this.css("cursor", "pointer");
            this.css("font", "52px 'Love Ya Like A Sister', cursive");

            this.bind("Click", function(obj) {
                console.log("click");
            });
        }
    });
    var newGame = Crafty.e("TitleScreenButton").text("Defend the Den").attr({
		w: 450,
		h: 40,
        x: 150,
        y: 120
    });

});
