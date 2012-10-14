define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/home/main.html'
], function($, _, Backbone, mainHomeTemplate) {

    var MainHomeView = Backbone.View.extend({
        el: $("#page"),
        render: function() {
            this.el.html(mainHomeTemplate);
        }
    });

    return new MainHomeView;

});
