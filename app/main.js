require.config({
    paths: {
        loader: '../libs/backbone/loader',
        jQuery: '../libs/jquery/jquery',
        Underscore: '../libs/underscore/underscore',
        Backbone: '../libs/backbone/backbone',
        Crafty: '../libs/crafty/crafty',
        Caman: '../libs/caman/caman',
        EventEmitter: '../libs/eventemitter2/eventemitter2',
        Burst: '../libs/burst/burst',
        MouseTrap: '../libs/mousetrap/mousetrap',
        Color: '../libs/color/color',
        Store: '../libs/store/store',
        templates: '../templates',
        game: '../game',
        libs: '../libs'
    }
});

require(['app', 'game/components'], function(App) { App.initialize(); });
