define([
    'jQuery',
    'Underscore',
    'Backbone',
    'router',
    'config'
], function($, _, Backbone, Router, config) {

    var initialize = function() {
        
        Crafty.init(config.viewport.width, config.viewport.height);
        
        
        // FIXME
        $(window).resize(function() {
            var viewport = $("#cr-stage");
            if(viewport.height() > $("body").height()) {
                $("#cr-stage").css({
                    "position": "absolute",
                    "top": "0",
                    "left": "50%",
                    "margin-left": "-355px",
                    "margin-top": "0"
                });
                /*$("#cr-stage").removeClass("placeFixed").addClass("placeAbsolute");
                $("#wrapper").removeClass("placeFixed").addClass("placeAbsolute");*/
                
            } else {
                $("#cr-stage").css({
                    "position": "fixed",
                    "top": "50%",
                    "left": "50%",
                    "margin-top": "-290px",
                    "margin-left": "-355px"
                });
                /*$("#cr-stage").removeClass("placeAbsolute").addClass("placeFixed");
                $("#wrapper").removeClass("placeAbsolute").addClass("placeFixed");*/

            }
        });
        
        Router.initialize();
        
    };

    return {
        initialize: initialize
    };

});
