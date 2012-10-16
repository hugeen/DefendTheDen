define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/home/show.html'
], function($, _, Backbone, _show) {

    var Show = Backbone.View.extend({
        el: $("#main"),
        render: function() {
            this.el.html(_show);
        }
    });

    return new Show;

});
