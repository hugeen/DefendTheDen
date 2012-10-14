define([
    'jQuery',
    'Underscore',
    'Backbone',
    'router',
    'config'
], function($, _, Backbone, Router, config) {

    var initialize = function() {
        
        Crafty.init(config.viewport.width, config.viewport.height);
        
        Router.initialize();
        
    };

    return {
        initialize: initialize
    };

});
