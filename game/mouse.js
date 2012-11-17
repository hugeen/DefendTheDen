define([
    'jquery',
    'game/viewport'
], function($, viewport) {

    return {
        position: {
            absolute: { x: 0, y: 0 },
            relative: { x: 0, y: 0 }
        },
        onMove: function(e) {
            this.position.absolute = {
                x: e.clientX,
                y: e.clientY
            };
            this.position.relative = {
                x: e.clientX-viewport.offset.left,
                y: e.clientY-viewport.offset.top
            };
        },
        onClick: function(e) {
            
        },
        initialize: function() {
            var mouse = this;
            $(document).mousemove(function(e) { mouse.onMove(e); });
            $("#wrapper").click(function(e) { mouse.onClick(e); });
        }
    };

});