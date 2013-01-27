define([
    'backbone',
    'crafty',
    'game/keyboard'
], function(Backbone, Crafty, keyboard) {
    
    var Skill = Backbone.Model.extend({
        defaults: {
            cooldown: 1,
            action: function() {}
        },
        init: function() {
            
            var entity = Crafty.e("Skill");
            
            entity.skill({
                cooldown: this.get("cooldown"),
                key: this.keybind(),
                name: this.get("name")
            });
            
            entity.bind("SkillTriggered", this.get("action"));
            
        },
        keybind: function() {
            return keyboard.keybinds.AZERTY[this.get("name")];
        }
    });
    
    return Skill;
    
});
