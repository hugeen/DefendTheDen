define([
    'Underscore'
], function(_) {

    return {
        entityParser: function(code) {
            var entityCode = {
                "p": "Pig",
                "r": "RiddingHood",
                "g": "Granny",
                "!": "Nobody"
            };
            return entityCode[code];
        },
        roll: function(percent) {
            return _.random(1,100) > 100 - percent;
        }
    };

});
