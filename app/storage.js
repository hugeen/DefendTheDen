define([
    'underscore',
    'game/keyboard',
    'store'
], function(_, keyboard, store) {
    
    // https://github.com/marcuswestin/store.js
    // store.clear();
    
    if(_.isUndefined(store.get('keybinds'))) {
        store.set("keybinds", keyboard.keybinds.AZERTY);
    }

    return {};

});
