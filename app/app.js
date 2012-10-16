define([
    'jQuery',
    'Underscore',
    'Backbone',
    'router',
    'config'
], function($, _, Backbone, Router, config) {

    var initialize = function() {
        
        Crafty.init(config.viewport.width, config.viewport.height);
        
        (function initializeViewport() {
            
            var $viewport = $("#cr-stage, #wrapper, #inner_background");
            function replaceViewport() {
                if(config.viewport.height > $("body").height()) {
                    $viewport.removeClass("placeFixed").addClass("placeAbsolute");                
                } else {
                    $viewport.removeClass("placeAbsolute").addClass("placeFixed");
                }
            };

            $(replaceViewport());
            $(window).resize(function() { replaceViewport(); });
            
        })();

        Router.initialize();
        
    };

    return {
        initialize: initialize
    };

});
