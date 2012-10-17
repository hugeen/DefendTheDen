define([
    'Crafty',
    'Underscore',
    'game/assets/bundles'
], function(Crafty, _, assetsBundles) {
    
    return function(name, callbacks) {
        
        _.defaults(callbacks, {
            onProgress: function(e) {},
            onError: function(e) {}
        });
        var assetBundle = _.reject(assetsBundles[name], function(asset){ return asset.loaded === true; });
        var assetsPath = _.map(assetBundle, function(asset){ return asset.path(); });
        
        Crafty.load(assetsPath,
            function() {
                _.invoke(assetsBundles[name], 'setLoaded');
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
