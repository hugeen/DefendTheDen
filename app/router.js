define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home/main',
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

    var initialize = function() {
        var app_router = new AppRouter;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});
