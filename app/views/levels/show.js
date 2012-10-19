define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/scenes',
    'collections/assets',
    'game/assets_loader',
    'text!templates/levels/show.html',
], function($, _, Backbone, scenes, assets, assetsLoader, _show) {

    var Show = Backbone.View.extend({
        el: $("#wrapper"),
        render: function(id) {
            
            this.loadScene();
            
            this.$el.html(_.template(_show));
            $("#ig_menu button").click(function() {
               window.location.replace("#"); 
            });

        },
        loadScene: function() {
            var sceneName = "level";
            assetsLoader(assets.findByScene(sceneName), function() {
               scenes.findByName(sceneName).load();   
            });
        }
    });

    return new Show;

});
