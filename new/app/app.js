define([
    'crafty',
    'router',
    'game/config',
    'game/viewport',
    'game/mouse'
], function(Crafty, router, gameConfig, viewport, mouse) {

    var initialize = function() {
        Crafty.init(viewport.width, viewport.height);
        /*Crafty.box2D.init(
            gameConfig.box2d.gravity.x,
            gameConfig.box2d.gravity.x,
            gameConfig.box2d.pixelToMeter,
            gameConfig.box2d.sleep
        );*/
        
        viewport.initialize();
        mouse.initialize();
        router.initialize();
    };

    return {
        initialize: initialize
    };

});
