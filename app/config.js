define(function() {
    
    return {
        viewport: { width: 710, height: 580 },
        debug: true,
        cutscenes: true,
        box2d: {
            gravity: {
                x: 0,
                y: 10
            },
            pixelToMeter: 32,
            sleep: true
        }
    };

});
