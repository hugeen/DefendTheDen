define([
    'jquery',
    'underscore',
    'caman'
], function($, _, Caman) {
    
    return {
        manipulateImage: function(image) {
            
            Caman("#cr-stage", function() {
                this.brightness(5).render();
            });
            
            return /* canvas.*/toDataURL();
            
        }
    };

});
