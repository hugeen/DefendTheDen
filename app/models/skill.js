define([
    'backbone',
    'crafty',
    'game/keyboard'
], function(Backbone, Crafty, keyboard) {
    
    var Skill = Backbone.Model.extend({
        defaults: {
            player: false,
            cast: function() {}
        },
        keybind: function() {
            return keyboard.keybinds.AZERTY[this.get("name")];
        }
    });
    
    return Skill;
    
});
