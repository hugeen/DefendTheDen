var NewGame = BaseEntity.extend({
    initialize: function(){
        var entity = Crafty.e("MenuItem")
    	    .attr({
    	        x: 275,
    	        y: 310
    	    })
    	    .text("New Game")
    	    .bind('Click', function() {
                Crafty.scene("stage");
            });
    	this.set({ 'entity': entity });
    }
});