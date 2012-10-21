define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
    
    Crafty.c("Blood", {
        
        init : function() {
            this.addComponent("2D, Canvas, Particles, Delay");
            
            this.attr({
                w : 115,
                h : 115,
            });
            
            var options = {
                maxParticles: 75,
                size: 10,
                sizeRandom: 3,
                speed: 6,
                speedRandom: 2,
                lifeSpan: 15,
                lifeSpanRandom: 2,
                angle: 55,
                angleRandom: 12,
                startColour: [155, 5, 3, 0.9],
                startColourRandom: [200, 5, 10, 0.5],
                endColour: [200, 0, 0, 0.7],
                endColourRandom: [255, 8, 15, 0.7],
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