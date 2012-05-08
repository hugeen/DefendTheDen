var ContinueGame = BaseEntity.extend({
    initialize: function(){
        var entity = Crafty.e("MenuItem")
            .attr({
                x: 295,
                y: 380
            })
            .text("Continue")
            .bind('Click', function() {
                Crafty.scene("stage");
            });
    	this.set({ 'entity': entity });
    }
});