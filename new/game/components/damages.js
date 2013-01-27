define([
    'crafty'
], function(Crafty) {

    Crafty.c("Damages", {
        init: function() {
            this.addComponent("2D, Canvas, Text, Delay");
            this.textColor('#FFFFFF', 0.8);
            this.displayed = false;
            this.textFont({ type: 'italic', family: "'Marcellus SC', serif", size: '20px' });
        },
        display: function(damages, position) {
            this.displayed = true
            this.attr({
                x: position.x+20,
                y: position.y
            });
            this.text(damages);
            this.delay(function() {
                this.destroy();
            }, 250);
        }
    });

});
