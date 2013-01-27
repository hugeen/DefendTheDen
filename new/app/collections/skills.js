define([
    'backbone',
    'models/skill',
    'game/skills'
], function(Backbone, Skill, skillsData) {

    var Skills = Backbone.Collection.extend({
        model: Skill,
        playerSkills: function() {
            return this.filter(function(model) {
                return model.get("player");
            });
        }
    });
    
    return new Skills(skillsData);
    
});
