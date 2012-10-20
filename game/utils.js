define([
    'Underscore',
    'config'
], function(_, config) {

    return {
        entityParser: function(code) {
            var entitiesCode = {
                "p": "Pig",
                "r": "RiddingHood",
                "g": "Granny",
                "!": "Nobody"
            };
            return entitiesCode[code];
        },
        roll: function(percent) {
            return _.random(0,100) > 100 - percent;
        },
        outOfBounds: function(entity) {
            return !(entity.x < config.viewport.width && entity.x > 0 && entity.y < config.viewport.height && entity.y > 0);
        }
    };

});
