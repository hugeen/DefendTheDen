define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/show',
    'views/levels/show',
    'views/box2d/show'
], function($, _, Backbone, home, level, box2d) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'levels/:id': 'level',
            'box2d': 'box2d'
        },
        home: function() {
            home.render();
        },
        level: function(id) {
            level.render(id);
        },
        box2d: function() {
            box2d.render();
        }
    });
    
    var router;
    
    return {
        
        initialize: function() {
            router = new AppRouter;
            Backbone.history.start();
        },
        go: function(to) {
            router.navigate(to, {trigger: true, replace: true});
        }
        
    };

});
