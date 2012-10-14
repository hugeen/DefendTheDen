define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home/main',
    'views/levels/list'
], function($, _, Backbone, mainHomeView, levelsListView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '/levels': 'indexLevels',
            '/levels/:id': 'showLevel',
            '/survival': 'survival',
            '/credits': 'credits',
            '/skillshop': 'skillshop',
            '*actions': 'home'
        },
        home: function(actions) {
            mainHomeView.render();
        },
        credits: function() {
            
        },
        skillshop: function() {
            
        },
        survival: function() {
            
        },
        showLevel: function(id) {
            console.log(id);
        },
        indexLevels: function() {
            levelsListView.render();
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
