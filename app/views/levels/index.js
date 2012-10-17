define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/levels',
    'text!templates/levels/index.html',
    'game/scenes/blank'
], function($, _, Backbone, levels, _index, blankScene) {

    var Index = Backbone.View.extend({
        el: $("#wrapper"),
        initialize: function() {

        },
        render: function() {
            blankScene.load();
            var data = { levels: levels.models, _: _ };
            this.el.html(_.template(_index, data));
        }
    });

    return new Index;

});
