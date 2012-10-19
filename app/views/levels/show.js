define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/scenes',
    'text!templates/levels/show.html',
], function($, _, Backbone, scenes, _show) {

    var Show = Backbone.View.extend({
        el: $("#wrapper"),
        render: function(id) {
            
            scenes.findByName("level").load();
            
            this.$el.html(_.template(_show));
            $("#ig_menu button").click(function() {
               window.location.replace("#"); 
            });

        }
    });

    return new Show;

});
