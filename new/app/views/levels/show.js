define([
    'jquery',
    'underscore',
    'backbone',
    'collections/scenes',
    'collections/levels',
    'text!templates/layouts/battlefield.html',
    'text!templates/levels/show.html',
], function($, _, Backbone, scenes, levels, _battlefield, _show) {

    var Show = Backbone.View.extend({
        el: $("#wrapper"),
        render: function(id) {
            
            $("#inner_background").html(_.template(_battlefield));
            this.$el.html(_.template(_show));
            
            $("#ig_menu button").click(function() {
               window.location.replace("#"); 
            });
            scenes.findByName("level").load({level: levels.get(id)});

        }
    });

    return new Show;

});
