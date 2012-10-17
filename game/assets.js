define([
    'Crafty',
    'Underscore',
    'game/assets_manager'
], function(Crafty, _, assetsManager) {

    return {
        wolf: new assetsManager.Sprite({ name: "wolf", size: 135 }),
        pig: new assetsManager.Sprite({ name: "pig", size: 115 })
    }

});