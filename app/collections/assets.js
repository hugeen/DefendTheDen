define([
    'Underscore',
    'Backbone',
    'models/asset',
    'game/assets'
], function(_, Backbone, Asset, assetsData) {

    var Assets = Backbone.Collection.extend({
        model: Asset,
        findByScene: function(scene) {
            return this.filter(function(model) {
                return _.contains(model.get("scenes"), scene);
            });
        }
    });
    
    return new Assets(assetsData);
    
});
