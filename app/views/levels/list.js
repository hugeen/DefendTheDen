define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/levels',
    'text!templates/levels/list.html'
], function($, _, Backbone, levelsCollection, levelListTemplate) {

    var LevelListView = Backbone.View.extend({
        el: $("#page"),
        initialize: function() {
            //levelsCollection.bind("add", this.exampleBind);
            levelsCollection.add({
                name: "Level 1"
            });
            levelsCollection.add({
                name: "Level 2"
            });
            levelsCollection.add({
                name: "Level 3"
            });
        },
        exampleBind: function(model) {
            //console.log(model);
        },
        render: function() {
            var data = {
                levels: levelsCollection.models,
                _: _
            };
            var compiledTemplate = _.template(levelListTemplate, data);
            $("#page").html(compiledTemplate);
        }
    });

    return new LevelListView;

});
