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
        },
        mouse: {
            absolute: { x: 0, y: 0 },
            relative: { x: 0, y: 0 }
        },
        skills: {
            "0": "Attack",
            "1": "Shield"
        },
        keybinds: {
            AZERTY: {
                "0": "Q",
                "1": "D",
                "2": "A",
                "3": "E",
                "4": "R",
                "5": "F",
                "6": "T",
                "7": "V"
            },
            QWERTY: {
                "0": "A",
                "1": "D",
                "2": "Q",
                "3": "E",
                "4": "R",
                "5": "F",
                "6": "T",
                "7": "V"
            },
            QWERTZ: {
                "0": "A",
                "1": "D",
                "2": "Q",
                "3": "E",
                "4": "R",
                "5": "F",
                "6": "T",
                "8": "V"
            }
        }
    };

});
