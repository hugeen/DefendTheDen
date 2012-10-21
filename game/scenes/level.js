define(function(require) {
    
    
    var $ = require("jQuery");
    var Crafty = require("Crafty");
    var PlayerEntity = require("game/entities/player");
    var MonsterEntity = require("game/entities/monster");
    
    return {
        name: "level",
        init: function(options) {
            
            var player = PlayerEntity.create();
            
            Crafty.e("Wires");
            $("body").on("click", "#wrapper", function(e) {
                Crafty.e("Bullet").fire({x: player.x, y: player.y}, {x: e.clientX-$(this).offset().left, y: e.clientY-$(this).offset().top}, 10);
            });
            
        	/*var options = {
        	    maxParticles: 150,
                size: 18,
                sizeRandom: 4,
                speed: 1,
                speedRandom: 1.2,
                // Lifespan in frames
                lifeSpan: 29,
                lifeSpanRandom: 7,
                // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
                angle: 65,
                angleRandom: 34,
                startColour: [255, 131, 0, 1],
                startColourRandom: [48, 50, 45, 0],
                endColour: [245, 35, 0, 0],
                endColourRandom: [60, 60, 60, 0],
                // Only applies when fastMode is off, specifies how sharp the gradients are drawn
                sharpness: 20,
                sharpnessRandom: 10,
                // Random spread from origin
                spread: 10,
                // How many frames should this last
                duration: -1,
                // Will draw squares instead of circle gradients
                fastMode: false,
                gravity: { x: 0, y: 0.1 },
                // sensible values are 0-3
                jitter: 0
            }*/

            var monster = MonsterEntity.create("Pig");


            /*
            Crafty.e("Skill").initSkill();   
            Crafty.e("Bullet").fire({x: 5, y: 5}, {x: 50, y: 50}, 5);
            */
        },
        uninit: function() {
            $("body").off("click", "#wrapper")
        }
    };

});
