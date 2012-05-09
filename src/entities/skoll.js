var Skoll = BaseEntity.extend({
	defaults: {
        'speed' : 10,
    },
    initialize: function(){
        
    	var skoll = Crafty.e("Wolf");
        
        skoll.attr({
            x: 0,
            y: 0,
            z: 300
        });
        
        skoll.multiway(this.get('speed'),{
            Z: -90,
            S: 90
        });
        
        skoll.bind('EnterFrame', function(e){
            
        });
        
        skoll.bind('Click', function(){
            
        });
        
        skoll.origin(skoll.w/2, skoll.h/2);
        
    	this.set({'entity' : skoll });
    	
    }
});