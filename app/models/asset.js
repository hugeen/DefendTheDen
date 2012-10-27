define([
    'underscore',
    'backbone',
    'crafty'
], function(_, Backbone, Crafty) {
    
    var Asset = Backbone.Model.extend({
        defaults: {
            loaded: false,
            type: "images",
            ext: "png",
            scenes: []
        },
        initialize: function() {

            if(this.get("type") === "sprites") {
                
                _.defaults(this.attributes, {
                    size: 32,
                    padding: {
                        x: 0,
                        y: 0
                    },
                    maps: [{
                        name: this.get("name"),
                        coords: { x: 0, y: 0, w: 1, h: 1 }
                    }]
                });

                this.addOnCrafty();

            }
            
        },
        path: function() {
            
            return "assets/"+this.get("type")+"/"+this.get("name")+"."+this.get("ext");
            
        },
        onLoaded: function() {
            
            return this.set({ loaded: true });
            
        },
        addOnCrafty: function() {

            var maps = {};
            _.each(this.get("maps"), function(map) {
                
                _.defaults(map, { coords: { x: 0, y: 0, w: 1, h: 1 } });
                return maps[map.name] = [
                    map.coords.x,
                    map.coords.y,
                    map.coords.w,
                    map.coords.h
                ];
                
            });

            return Crafty.sprite(
                this.get("size"),
                this.path(), maps,
                this.get("padding").x,
                this.get("padding").y
            );
            
        }
    });
    
    return Asset;
    
});
