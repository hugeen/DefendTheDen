var Sprites = Backbone.Model.extend({
    defaults: {
        images:{
            'background': {
                 'file': 'web/images/background.png',
                 'tile': Crafty.viewport.width,
                 'tileh' : Crafty.viewport.height,
                 'elements': {
                     'background': [0, 0]
                 }
            },
            'floor': {
                 'file': 'web/images/floor.png',
                 'tile': Crafty.viewport.width,
                 'tileh' : 309,
                 'elements': {
                     'floor': [0, 0]
                 }
            },
            'clouds': {
                 'file': 'web/images/clouds.png',
                 'tile': 916,
                 'tileh' : 114,
                 'elements': {
                     'clouds': [0, 0]
                 }
            },
            'sky': {
                 'file': 'web/images/background-sky.png',
                 'tile': Crafty.viewport.width,
                 'tileh' : Crafty.viewport.height,
                 'elements': {
                     'sky': [0, 0]
                 }
            },
            'earth': {
                 'file': 'web/images/background-earth.png',
                 'tile': Crafty.viewport.width,
                 'tileh' : Crafty.viewport.height,
                 'elements': {
                     'earth': [0, 0]
                 }
            },
            'lines': {
                 'file': 'web/images/background-lines.png',
                 'tile': Crafty.viewport.width,
                 'tileh' : Crafty.viewport.height,
                 'elements': {
                     'lines': [0, 0]
                 }
            },
            'skoll': {
                 'file': 'web/images/skoll.png',
                 'tile': 135,
                 'elements': {
                     'skoll': [0, 0]
                 }
            },
            'wagon': {
                 'file': 'web/images/wagon.png',
                 'tile': 81,
                 'elements': {
                     'wagon': [0, 0]
                 }
            },
            'axe': {
                  'file': 'web/images/axe.png',
                  'tile': 42
                  ,
                  'elements': {
                      'axe': [0, 0]
                  }
            }
        }
    },
    initialize: function(){
        
    },
    create: function(key){
        var element;
        if(key != undefined){
            element = this.get('static_images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            element = this.get('images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };

        _.each(this.get('images'), function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });

    },
    getPaths: function(){
        var array = [], i=0;
        _.each(this.get('images'), function(element, key){ 
            array[i] = element['file']
            i++;
        });

        return array;
    }
});