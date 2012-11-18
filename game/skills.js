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
        backgroundPosition: "0 0"
    }, {
        name: "Attack",
        cooldown: 0.7,
        action: function() {
            var player = PlayerEntity.get();
            Crafty.e("Attack").attack({
                x: player.x,
                y: player.y
            }, mousePosition());
        },
        backgroundPosition: "-53px 0"
    }, {
        cooldown: 5,
        name: "Blow",
        backgroundPosition: "-106px 0"
    }, {
        name: "Stone",
        cooldown: 5,
        backgroundPosition: "-159px 0"
    }, {
        name: "Root",
        cooldown: 10,
        backgroundPosition: "-212px 0"
    }, {
        name: "Frost",
        cooldown: 7,
        backgroundPosition: "-265px 0"
    }, {
        name: "Hast",
        cooldown: 30,
        backgroundPosition: "-318px 0"
    }, {
        name: "Life",
        cooldown: 30,
        backgroundPosition: "-371px 0"
    }];

});
