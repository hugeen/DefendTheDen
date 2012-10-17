define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/home/show.html',
    'game/scenes/blank'
], function($, _, Backbone, _show, blankScene) {

    var Show = Backbone.View.extend({
        el: $("#wrapper"),
        render: function() {
            blankScene.load();
            this.el.html(_show);
        }
    });

    return new Show;

});
