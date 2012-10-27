define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("NonPlayableCharacter", {
        init: function() {
            this.addComponent("Character");
            this.attr({
                x : 600,
                y : 50
            });
            this.walkSpeed = 1;
            this.walkSpeedModifier = 1;
            this.bind("EnterFrame", function() {
                this.walk();
            });
        },
        walk: function() {
            this.move("w", this.walkSpeed*this.walkSpeedModifier);
        },
        moveToLine: function(line) {
            var position = {
                top: 40,
                line: (line * 70) - 70
            };
            
            this.attr({
                y : position.top + position.line
            });
        }
    });

});
