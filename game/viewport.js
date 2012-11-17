define([
    'jquery'
], function($) {

    return {
        width: 710,
        height: 580,
        initialize: function() {
            
            var viewport = this;
            var $viewport = $("#cr-stage, #wrapper, #inner_background");
            var $outer = $("#outer_background");
            
            function replaceViewport() {
                if(viewport.height > $("body").height()) {
                    $viewport.removeClass("viewport_fixed").addClass("viewport_absolute");
                    $outer.removeClass("outer_fixed").addClass("outer_absolute");
                } else {
                    $viewport.removeClass("viewport_absolute").addClass("viewport_fixed");
                    $outer.removeClass("outer_absolute").addClass("outer_fixed");
                }
                viewport.offset = $("#cr-stage").offset()
            };
            
            $(replaceViewport());
            $(window).resize(function() { replaceViewport(); });
        }
    };

});