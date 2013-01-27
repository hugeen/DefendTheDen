define([
    'underscore',
    'eventEmitter',
    'libs/burst/burst.images'
], function(_, EventEmitter, burstImages) {
    
    var Burst = {
        extend: function() {
            _.each(arguments, function(mixin) {
                _.extend(this, mixin);
            }, this);
        }
    };
    
    var burstEventBus = new EventEmitter({ wildcard: true });
    
    Burst.extend(burstEventBus, burstImages);

    return Burst;

});