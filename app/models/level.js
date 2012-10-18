define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    
    var Level = Backbone.Model.extend({
        defaults: {
            current: false
        },
        initialize: function() {
            
        }
    });
    
    return Level;
    
});
