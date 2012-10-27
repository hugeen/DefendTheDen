define([
    'jquery',
    'backbone',
    'collections/scenes',
    'text!templates/box2d/show.html'
], function($, Backbone, scenes, _show) {

    var Show = Backbone.View.extend({
        el: $("#wrapper"),
        render: function() {
            $("#inner_background").html("");
            scenes.findByName("box2d").load();
            this.$el.html(_show);   
        }
    });

    return new Show;

});
