define([
    'jQuery',
    'Underscore',
    'Backbone',
    'Crafty'
], function($, _, Backbone, Crafty) {
    
    var sceneName = "level"
    Crafty.scene(sceneName, function () {

    });
    
    return function() {
        Crafty.scene(sceneName);
    };

});
