var storage = {};

storage.pigDied = new LocalStore('pig_died', {
    defaultVal: 0
});
storage.axeThrowed = new LocalStore('axe_trhowed', {
    defaultVal: 0
});
storage.goldCoins = new LocalStore('gold_coins', {
    defaultVal: 0
});
storage.level = new LocalStore('level', {
    defaultVal: 1
});
storage.axeSkill = new LocalStore('axe_skill', {
    defaultVal: 1
});

var resetStorage = function() {
	storage.goldCoins.set(0);
	storage.level.set(1);
	storage.axeSkill.set(1);
};
