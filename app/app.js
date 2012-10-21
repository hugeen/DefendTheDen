define([
    'jQuery',
    'router',
    'config'
], function($, Router, config) {

    var initialize = function() {

        var gx=0;
        var gy=10;
        var ptm_ratio=32;
        var doSleep=true;
        
        Crafty.init(config.viewport.width, config.viewport.height);
        Crafty.box2D.init(gx, gy, ptm_ratio, doSleep);
        
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
            };

            $(replaceViewport());
            $(window).resize(function() { replaceViewport(); });
            
        })();
        
    };

    return {
        initialize: initialize
    };

});
