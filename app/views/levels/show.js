define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/levels',
    'text!templates/levels/show.html'
], function($, _, Backbone, levels, _show) {

    var Show = Backbone.View.extend({
        el: $("#main"),
        render: function(id) {
            var data = { level: levels.at(id), _: _ };
            this.el.html(_.template(_show, data));
        }
    });

    return new Show;

});
