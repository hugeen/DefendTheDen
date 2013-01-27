define([
    'underscore',
    'crafty'
], function(_, Crafty) {
    
    Crafty.c("Life", {
        init : function() {  
            this.life = 100;
            this.takeDamages = function(damages, opponent) {
                this.life -= damages;
                if(this.life <= 0) {
                    this.trigger("Death", damages, opponent);
                }
            };
        }
    });

});
