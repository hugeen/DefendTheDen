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
            this.collection = levelsCollection;
            this.collection.bind("add", this.exampleBind);
            this.collection = levelsCollection.add({
                name: "Twitter"
            });
            this.collection = levelsCollection.add({
                name: "Facebook"
            });
            this.collection = levelsCollection.add({
                name: "Myspace",
                score: 20
            });
        },
        exampleBind: function(model) {
            //console.log(model);
        },
        render: function() {
            var data = {
                levels: this.collection.models,
                _: _
            };
            var compiledTemplate = _.template(levelListTemplate, data);
            $("#page").html(compiledTemplate);
        }
    });

    return new LevelListView;

});
