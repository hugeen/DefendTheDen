define([
    'jQuery',
    'router',
    'config'
], function($, Router, config) {

    var initialize = function() {

        Crafty.init(config.viewport.width, config.viewport.height);
        Crafty.box2D.init(config.box2d.gravity.x, config.box2d.gravity.x, config.box2d.pixelToMeter, config.box2d.sleep);
        
        Router.initialize();
        
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
                
                config.offset = $("#cr-stage").offset()
            };

            $(replaceViewport());
            $(window).resize(function() { replaceViewport(); });
            
        })();
        
    };

    return {
        initialize: initialize
    };

});
