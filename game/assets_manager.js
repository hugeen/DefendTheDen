define([
    'Crafty',
    'Underscore'
], function(Crafty, _) {
    
    function addAssetCapabilities(object) {
        _.defaults(object, { loaded: false });
        object.path = function() {
            return "assets/"+object.type+"/"+object.name+"."+object.ext;
        };
        object.setLoaded = function() {
            this.loaded = true;  
        };
    }
    
    function addImageCapabilities(object) {
        _.defaults(object, {
            type: "images",
            ext: "png"
        });
        addAssetCapabilities(object);
    }
    
    function addAudioCapabilities(object) {
        _.defaults(object, {
            type: "audio",
            ext: "ogg"
        });
        addAssetCapabilities(object);
    }

    return {
        Image: function(image) {
            
            addImageCapabilities(this);
            
        },
        Sprite: function(sprite) {

            _.extend(this, {
                size: 32,
                padding: {
                    x: 0,
                    y: 0
                },
                maps: {}
            }, sprite);
            
            addImageCapabilities(this);
            
            var maps = {};
            
            function addMap(mapObject) {
                
                _.defaults(mapObject, { coords: { x: 0, y: 0, w: 1, h: 1 } });
                
                return maps[mapObject.name] = [
                    mapObject.coords.x,
                    mapObject.coords.y,
                    mapObject.coords.w,
                    mapObject.coords.h
                ];
                
            }
            
            if(_.isEmpty(this.maps)) {
                addMap({ name: this.name });
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
