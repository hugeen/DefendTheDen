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
        },
        loadByScene: function(scene, callback) {
            
            var assets = this.findByScene(scene);
            
            var callbacks = {
                onLoad: callback || function() {},
                onProgress: function(e) {},
                onError: function(e) {}
            }
            
            var assetsPath = _.map(assets, function(asset){ return asset.path(); });

            if(_.isEmpty(assetsPath)) {
                return callbacks.onLoad();
            }
            Crafty.load(assetsPath,
                function() {
                    _.invoke(assets, 'onLoaded');
                    callbacks.onLoad();
                },
                function(e) {
                    callbacks.onProgress();
                },
                function(e) {
                    callbacks.onError();
                }
            );

        }
    });
    
    return new Assets(assetsData);
    
});
