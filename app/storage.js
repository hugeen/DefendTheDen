define([
    'underscore',
    'config',
    'store'
], function(_, config, store) {
    
    // https://github.com/marcuswestin/store.js
    
    // store.clear();
    
    if(_.isUndefined(store.get('keybinds'))) {
        store.set("keybinds", config.keybinds.AZERTY);
    }
    if(_.isUndefined(store.get('skills'))) {
        store.set("keybinds", config.skills.default);
    }
    console.log(store.get('keybinds'));

    return {};

});
