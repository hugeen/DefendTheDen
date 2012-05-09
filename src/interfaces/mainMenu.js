var MainMenu"" = BaseEntity.extend({
    initialize: function(){
        
    	Crafty.e("Background");
    	Crafty.e("Floor");
    	Crafty.e("Clouds");
    	Crafty.e("Clouds").attr({x: 916});
    	
    	Crafty.e("MenuItem")
    	    .attr({
    	        x: 275,
    	        y: 310
    	    })
    	    .text("New Game")
    	    .bind('Click', function() {
                Crafty.scene("stage");
            });
            
        Crafty.e("MenuItem")
            .attr({
                x: 295,
                y: 380
            })
            .text("Continue")
            .bind('Click', function() {
                Crafty.scene("stage");
            });
    }
});