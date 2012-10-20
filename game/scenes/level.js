define(function(require) {
    
    var Crafty = require("Crafty");
    var player = require("game/entities/player");

    return {
        name: "level",
        init: function(options) {
            console.log("Level loaded", options);
            player.create();
            Crafty.e("Wolf");
        }
    };

});
