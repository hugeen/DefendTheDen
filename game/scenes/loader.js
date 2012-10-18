define([
    'Underscore',
    'Crafty',
    'game/scenes/level'
], function(_, Crafty, levelScene) {

    return {
        load: function(sceneName) {
            Crafty.scene(sceneName)
        }
    };

});
