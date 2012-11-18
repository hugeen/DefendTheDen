define([
    'backbone',
    'crafty'
], function(Backbone, Crafty) {
    
    var Skill = Backbone.Model.extend({
        defaults: {},
        addEntity: function() {
            
            return Crafty.e("Skill").skill({
                cooldown: 0.5
            }).bind("SkillTriggered", function() {
                console.log("skill triggered")
                //AttackEntity.create(player);
            });
            
        },
        fire: function() {
            
        }
    });
    
    return Skill;
    
});
