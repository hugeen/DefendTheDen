define([
    'backbone',
    'models/level',
    'game/levels'
], function(Backbone, Level, levelsData) {

    var Levels = Backbone.Collection.extend({
        model: Level
    });
    
    return new Levels(levelsData);
    
});
