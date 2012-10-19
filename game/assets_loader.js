define([
    'Crafty',
    'Underscore'
], function(Crafty, _) {

    return function(assets, callback) {
        
        var callbacks = {
            onLoad: callback || function() {},
            onProgress: function(e) {},
            onError: function(e) {}
        }

        var assetsPath = _.map(assets, function(asset){ return asset.path(); });
        
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
        
    };

});
