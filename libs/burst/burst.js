define([
    "Underscore",
    "EventEmitter"
], function(_, EventEmitter) {
    
    var Burst = {
        extend: function() {
            _.each(arguments, function(mixin) {
                _.extend(this, mixin);
            }, this);
        }
    };
    
    Burst.extend(new EventEmitter({ wildcard: true }));

    return Burst;

});