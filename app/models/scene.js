define([
    'Backbone',
    'Crafty',
    'collections/assets'
], function(Backbone, Crafty, assets) {
    
    var Scene = Backbone.Model.extend({
        defaults: {
            init: function() {},
            uninit: function() {}
        },
        initialize: function() {
            return Crafty.scene(this.get("name"), this.get("init"), this.get("uninit"));
        },
        load: function() {
            var sceneName = this.get("name");
            assets.loadByScene(sceneName, function() {
               Crafty.scene(sceneName);
            });
        }
    });
    
    return Scene;
    
});
