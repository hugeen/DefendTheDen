define([
    'Crafty',
    'Underscore'
], function(Crafty, _) {
    
    function addAssetCapabilities(object) {
        _.defaults(object, { loaded: false });
        object.path = function() {
            return "assets/"+object.type+"/"+object.name+"."+object.ext;
        };
        object.onLoad = function() {
            this.loaded = true;  
        };
    }
    
    function addImageCapabilities(object) {
        _.defaults(object, {
            type: "images",
            ext: "png"
        });
        addAssetCapabilities(this);
    }
    
    function addAudioCapabilities(object) {
        _.defaults(object, {
            type: "audio",
            ext: "ogg"
        });
        addAssetCapabilities(this);
    }

    return {
        Image: function(image) {
            
            addImageCapabilities(this);
            
        },
        Sprite: function(sprite) {
            
            addImageCapabilities(this);
            
            _.defaults(this, {
                size: 16,
                padding: {
                    x: 0,
                    y: 0
                },
                maps: {}
            });
            
            var maps = {};
            
            function addMap(mapObject) {
                
                _.defaults(mapObject.coords, { x: 0, y: 0, w: 1, h: 1 });
                
                return maps[mapObject.name] = [
                    mapObject.coords.x,
                    mapObject.coords.y,
                    mapObject.coords.w,
                    mapObject.coords.h
                ];
                
            }
            
            if(_.isEmpty(this.maps)) {
                addMap(this.name);
            } else {
                _.each(this.maps, function(mapObject) {
                    addMap(mapObject.name, mapObject.coords);
                });
            }
            
            Crafty.sprite(this.size, this.path(), maps, this.padding.x, this.padding.y);
            
        },
        Audio: function(audio) {
            
            addAudioCapabilities(this);
            
        }
    };

});
