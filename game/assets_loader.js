define([
    'Crafty',
    'Underscore',
    'game/assets_bundles'
], function(Crafty, _, assetsBundles) {
    
    return function(name, callbacks) {
        
        _.defaults(callbacks, {
            loadingProgress: function(e) {},
            loadingError: function(e) {}
        });
        var assetBundle = _.reject(assetsBundles[name], function(asset){ return asset.loaded === true; });
        var assetsPath = _.map(bunlde, function(asset){ return asset.path(); });
        
        Crafty.load(assetsPath,
            function() {
                _.invoke(assetsBundles[name], 'setLoaded');
                callbacks.loaded();
            },
            function(e) {
              callbacks.loadingProgress();
            },
            function(e) {
              callbacks.loadingError();
            }
        );
        
    }

});
