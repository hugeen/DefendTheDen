define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home/show',
    'views/levels/index',
    'views/levels/show'
], function($, _, Backbone, home, levels, level) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '/levels': 'levels',
            '/levels/:id': 'level',
            '/survival': 'survival',
            '/credits': 'credits',
            '/skillshop': 'skillshop',
            '*actions': 'home'
        },
        home: function(actions) {
            home.render();
        },
        credits: function() {
            
        },
        skillshop: function() {
            
        },
        survival: function() {
            
        },
        level: function(id) {
            level.render(id);
        },
        levels: function() {
            levels.render();
        }
    });

    return {
        
        initialize: function() {
            new AppRouter;
            Backbone.history.start();
        }
        
    };

});
