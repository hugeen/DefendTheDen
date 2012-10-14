define([
    'jQuery',
    'Underscore',
    'Backbone',
    'Crafty'
], function($, _, Backbone, Crafty) {
    
    var entityName = "wolf";
    
    Crafty.addEntityFactory(entityName, function() {
        return Crafty.e('2D, Canvas');
    });
    
    return function() {
        return Crafty.newFactoryEntity(entityName);
    };

});
