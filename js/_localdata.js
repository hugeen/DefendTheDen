var storage = {
    endless     : new LocalStore('endless',         { defaultVal : true }),
    endlessScore: new LocalStore('endlessScore',    { defaultVal : 0 }),
    pigDied     : new LocalStore('pig_died',        { defaultVal : 0 }),
    axeThrowed  : new LocalStore('axe_trhowed',     { defaultVal : 0 }),
    blows       : new LocalStore('blows',           { defaultVal : 0 }),
    rocks       : new LocalStore('rocks',           { defaultVal : 0 }),
    axeThrowed  : new LocalStore('axe_trhowed',     { defaultVal : 0 }),
    goldCoins   : new LocalStore('gold_coins',      { defaultVal : 0 }),
    level       : new LocalStore('level',           { defaultVal : 1 }),
    axeSkill    : new LocalStore('axe_skill',       { defaultVal : 0 }),
    blowSkill   : new LocalStore('blow_skill',      { defaultVal : 0 }),
    rockSkill   : new LocalStore('rock_skill',      { defaultVal : 0 }),
    sound       : new LocalStore('sound',           { defaultVal : true })
};

var resetStorage = function() {
    storage.goldCoins.set(0);
    storage.level.set(1);
    storage.axeSkill.set(0);
    storage.blowSkill.set(0);
    storage.rockSkill.set(0);
};
