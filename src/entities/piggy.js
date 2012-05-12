var Piggy = BaseEntity.extend({

    initialize: function(){
        
    	var piggy = Crafty.e("Pig");
        
        piggy.attr({
            x: 0,
            y: 0,
            z: 300
        });

    	this.set({'entity' : piggy });
    	
    }
});