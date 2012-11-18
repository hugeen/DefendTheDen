define(function() {
    
    return [{
        name: "Shield",
        player: true,
        backgroundPosition: "0 0"
    }, {
        name: "Attack",
        player: true,
        cast: function(from, to) {
            Crafty.e("Attack").attack(from, to);
        },
        backgroundPosition: "-53px 0"
    }, {
        name: "Blow",
        player: true,
        backgroundPosition: "-106px 0"
    }, {
        name: "Stone",
        player: true,
        backgroundPosition: "-159px 0"
    }, {
        name: "Root",
        player: true,
        backgroundPosition: "-212px 0"
    }, {
        name: "Frost",
        player: true,
        backgroundPosition: "-265px 0"
    }, {
        name: "Hast",
        player: true,
        backgroundPosition: "-318px 0"
    }, {
        name: "Life",
        player: true,
        backgroundPosition: "-371px 0"
    }];

});
