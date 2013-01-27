define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Blood", {
        
        init : function() {
            this.addComponent("2D, Canvas, Particles, Delay");
            
            this.attr({
                w : 115,
                h : 115,
            });
            
            var options = {
                maxParticles: 50,
                size: 7,
                sizeRandom: 4,
                speed: 4,
                speedRandom: 2,
                lifeSpan: 12,
                lifeSpanRandom: 4,
                angle: 55,
                angleRandom: 12,
                startColour: [204, 17, 0, 1],
                startColourRandom: [204, 17, 0, 1],
                endColour: [204, 0, 17, 1],
                endColourRandom: [204, 17, 0, 1],
                sharpness: 2,
                sharpnessRandom: 5,
                spread: 5,
                duration: 10,
                fastMode: false,
                gravity: { x: 0, y: 0.2 },
                jitter: 1
            };
            
            this.spawnAt = function(coords) {
                this.attr(coords);
                this.particles(options);
                this.delay(function() {
                         this.destroy();
                }, 2000);
            }
        }
        
    });

});