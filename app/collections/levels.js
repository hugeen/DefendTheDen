define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/level'
], function($, _, Backbone, LevelModel) {

    var LevelsCollection = Backbone.Collection.extend({
        model: LevelModel,
        initialize: function() {

        }
    });
    
    return new LevelsCollection;
    
});
