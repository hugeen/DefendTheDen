define([
    "crafty",
    "game/entities/player",
    "game/mouse"
],function(Crafty, PlayerEntity, mouse) {
    
    function mousePosition() {
        return mouse.position.relative;
    };
    
    return [{
        name: "Shield",
        cooldown: 3,
        availableAt: 2,
        backgroundPosition: "0 0"
    }, {
        name: "Attack",
        cooldown: 0.7,
        action: function() {
            var player = PlayerEntity.get();
            var damages = { min: 30, max: 70 };
            Crafty.e("Attack").cast({
                x: player.x+40,
                y: player.y+25
            }, mousePosition(), damages);
        },
        availableAt: 1,
        backgroundPosition: "-424px 0"
    }, {
        cooldown: 5,
        name: "Blow",
        availableAt: 99,
        backgroundPosition: "-106px 0"
    }, {
        name: "Stone",
        cooldown: 5,
        availableAt: 99,
        backgroundPosition: "-159px 0"
    }, {
        name: "Root",
        cooldown: 10,
        availableAt: 99,
        backgroundPosition: "-212px 0"
    }, {
        name: "Frost",
        cooldown: 7,
        availableAt: 99,
        backgroundPosition: "-265px 0"
    }, {
        name: "Hast",
        cooldown: 30,
        availableAt: 99,
        backgroundPosition: "-318px 0"
    }, {
        name: "Life",
        cooldown: 30,
        availableAt: 99,
        backgroundPosition: "-371px 0"
    }];

});
