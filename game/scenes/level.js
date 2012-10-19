define(function(require) {
    
    var Crafty = require("Crafty");
    var player = require("game/entities/player");

    return {
        name: "level",
        init: function() {
            console.log("Level loaded");
            player.create();
        }
    };

});
