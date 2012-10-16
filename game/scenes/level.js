define([
    'jQuery',
    'Underscore',
    'Backbone',
    'Crafty',
    'game/entities/wolf'
], function($, _, Backbone, Crafty, wolf) {
    console.log(wolf)
    var sceneName = "level"
    Crafty.scene(sceneName, function() {
        wolf.spawnEntity();
    });
    
    return {
        load: function() {
            Crafty.scene(sceneName)
        }
    };

});
