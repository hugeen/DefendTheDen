define([
    'jQuery',
    'router',
    'config',
    'game/utils'
], function($, Router, config, utils) {

    var initialize = function() {
        Crafty.init(config.viewport.width, config.viewport.height);
        Crafty.box2D.init(config.box2d.gravity.x, config.box2d.gravity.x, config.box2d.pixelToMeter, config.box2d.sleep);
        utils.initializeViewport();
        utils.initializeMouseHandler();
        Router.initialize();
    };

    return {
        initialize: initialize
    };

});
