define([
    'Crafty',
    'Underscore'
    'game/assets_manager'
], function(Crafty, _, assetsManager) {

    return {
        background: new assetsManager.Image({ name: "background" }),
        clouds: new assetsManager.Image({ name: "clouds" }),
        floor: new assetsManager.Image({ name: "floor" }),
        menuSprites: new assetsManager.Image({ name: "menu-sprites" })
    }

});