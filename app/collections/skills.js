define([
    'backbone',
    'models/skill',
    'game/skills'
], function(Backbone, Skill, skillsData) {

    var Skills = Backbone.Collection.extend({
        model: Skill
    });
    
    return new Skills(skillsData);
    
});
