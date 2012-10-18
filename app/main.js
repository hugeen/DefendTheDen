require.config({
    paths: {
        loader: '../libs/backbone/loader',
        jQuery: '../libs/jquery/jquery',
        Underscore: '../libs/underscore/underscore',
        Backbone: '../libs/backbone/backbone',
        Crafty: '../libs/crafty/crafty',
        templates: '../templates',
        game: '../game'
    }
});

require(['app'], function(App) { App.initialize(); });
