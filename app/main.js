
require.config({
    paths: {
        underscore: '../libs/underscore/underscore-min',
        backbone: '../libs/backbone/backbone-min',
        crafty: '../libs/crafty/crafty-src',
        caman: '../libs/caman/caman-min',
        eventEmitter: '../libs/eventemitter2/eventemitter2',
        burst: '../libs/burst/burst',
        mouseTrap: '../libs/mousetrap/mousetrap',
        store: '../libs/store/store',
        templates: '../templates',
        game: '../game',
        libs: '../libs'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: "Backbone"
        },
        caman: {
            exports: "Caman"
        },
        crafty: {
            exports: "Crafty"
        }
    }
});

require(['app', 'game/components'], function(App) { App.initialize(); });
