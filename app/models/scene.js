define([
    'Backbone',
    'Crafty'
], function(Backbone, Crafty) {
    
    var Scene = Backbone.Model.extend({
        defaults: {
            init: function() {},
            uninit: function() {}
        },
        initialize: function() {
            return Crafty.scene(this.get("name"), this.get("init"), this.get("uninit"));
        },
        load: function() {
            return Crafty.scene(this.get("name"));
        }
    });
    
    return Scene;
    
});
