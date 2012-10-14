define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    
    var LevelModel = Backbone.Model.extend({
        defaults: {
            score: 10
        },
        initialize: function() {
            
        }
    });
    
    return LevelModel;
    
});
