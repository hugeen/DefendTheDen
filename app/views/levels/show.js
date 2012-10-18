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
            this.$el.html("level")
            /*assetsLoader("levels", {
                onLoad: function() {
                    levelScene.load();
                }
            });*/
            /*
            var data = { level: levels.at(parseInt(id,10)-1), _: _ };
            this.$el.html(_.template(_show, data));
            $("#ig_menu button").click(function() {
               window.location.replace("#"); 
            });*/
        }
    });

    return new Show;

});
