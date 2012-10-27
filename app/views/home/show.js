define([
    'jquery',
    'backbone',
    'collections/scenes',
    'text!templates/home/show.html'
], function($, Backbone, scenes, _show) {

    var Show = Backbone.View.extend({
        el: $("#wrapper"),
        render: function() {
            $("#inner_background").html("");
            scenes.findByName("blank").load();
            this.$el.html(_show);   
        }
    });

    return new Show;

});
