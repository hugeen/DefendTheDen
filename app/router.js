define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home/show',
    'views/levels/show'
], function($, _, Backbone, home, levels, level) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'levels/:id': 'level'
        },
        home: function() {
            home.render();
        },
        level: function(id) {
            level.render(id);
        }
    });

    return {
        
        initialize: function() {
            var router = new AppRouter;
            Backbone.history.start();
        }
        
    };

});
