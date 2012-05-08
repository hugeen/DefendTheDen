var Clouds = BaseEntity.extend({
    defaults: {
	    'x': 0
    },
    initialize: function(){
    	this.set({ 'entity': Crafty.e("Clouds").attr({x: this.get("x")}) });
    }
});