define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/level',
    'game/levels'
], function($, _, Backbone, Level, levelsData) {

    var Levels = Backbone.Collection.extend({
        model: Level,
        initialize: function() {

        }
    });
    
    return new Levels(levelsData);
    
});
