define([
    'underscore',
    'crafty'
], function(_, Crafty) {

    return {
        create: function(player) {
            
            var attackEntity = Crafty.e("Attack");
            attackEntity.attack(player);
            
            return attackEntity;
        }
    };

});
