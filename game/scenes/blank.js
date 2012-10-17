define([
    'jQuery',
    'Underscore',
    'Backbone',
    'Crafty'
], function($, _, Backbone, Crafty, wolf) {

    var sceneName = "blank"
    Crafty.scene(sceneName, function() {});
    
    return {
        load: function() {
            Crafty.scene(sceneName)
        }
    };

});
