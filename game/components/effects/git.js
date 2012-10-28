define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Git", {
        
        init : function() {
            
            this.addComponent("2D, Canvas, ImageParticles, Delay");
            
            this.attr({
                w : 115,
                h : 115,
            });
            
            var options = {
                maxParticles: 9,
                size: 32,
                sizeRandom: 0,
                speed: 5,
                speedRandom: 2,
                lifeSpan: 20,
                lifeSpanRandom: 5,
                angle: 55,
                angleRandom: 12,
                startColour: [155, 5, 3, 0.9],
                startColourRandom: [200, 5, 10, 0.5],
                endColour: [200, 0, 0, 0.7],
                endColourRandom: [255, 8, 15, 0.7],
                sharpness: 2,
                sharpnessRandom: 5,
                spread: 25,
                duration: 10,
                fastMode: false,
                gravity: { x: 0, y: 0.2 },
                jitter: 2
            };
            
            this.spawnAt = function(coords) {
                this.attr(coords);
                this.particles(options, "assets/images/github.png");
                this.delay(function() {
                         this.destroy();
                }, 2000);
            }
            
        }
        
    });

});