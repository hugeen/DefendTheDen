define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home/main',
    'views/levels/list'
], function($, _, Backbone, mainHomeView, levelsListView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '/levels': 'showLevels',
            '*actions': 'defaultAction'
        },
        showLevels: function() {
            levelsListView.render();
        },
        defaultAction: function(actions) {
            mainHomeView.render();
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
