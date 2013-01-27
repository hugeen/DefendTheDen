define([
    'backbone',
    'models/level',
    'game/levels'
], function(Backbone, Level, levelsData) {

    var Levels = Backbone.Collection.extend({
        model: Level,
        findById: function(id){
            return this.get(id);
        }
    });
    
    return new Levels(levelsData);
    
});
