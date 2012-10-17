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
            var $outer = $("#outer_background");
            function replaceViewport() {
                if(config.viewport.height > $("body").height()) {
                    $viewport.removeClass("viewport_fixed").addClass("viewport_absolute");
                    $outer.removeClass("outer_fixed").addClass("outer_absolute");
                } else {
                    $viewport.removeClass("viewport_absolute").addClass("viewport_fixed");
                    $outer.removeClass("outer_absolute").addClass("outer_fixed");
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
