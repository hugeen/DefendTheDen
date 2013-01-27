define([
    'backbone',
    'crafty',
    'collections/assets'
], function(Backbone, Crafty, assets) {
    
    var Scene = Backbone.Model.extend({
        defaults: {
            optionsBuffer: {},
            init: function() {},
            uninit: function() {}
        },
        initialize: function() {

            var init = this.get("init");
            var scene = this;
            
            return Crafty.scene(this.get("name"), function() {
                init(scene.optionsBuffer);
            }, this.get("uninit"));
            
        },
        load: function(options) {
            
            this.optionsBuffer = options || {};
            
            var sceneName = this.get("name");
            
            assets.loadByScene(sceneName, function() {

                Crafty.scene(sceneName);
                this.optionsBuffer = {};
            });

        }
    });
    
    return Scene;
    
});
