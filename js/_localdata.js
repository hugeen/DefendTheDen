var storage = {};

storage.pigDied = new LocalStore('pig_died', {
    defaultVal: 0
});
storage.axeThrowed = new LocalStore('axe_trhowed', {
    defaultVal: 0
});
storage.blows = new LocalStore('blows', {
    defaultVal: 0
});
storage.rocks = new LocalStore('rocks', {
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
    defaultVal: 0
});
storage.blowSkill = new LocalStore('blow_skill', {
    defaultVal: 0
});
storage.rockSkill = new LocalStore('rock_skill', {
    defaultVal: 0
});
var resetStorage = function() {
	storage.goldCoins.set(0);
	storage.level.set(5);
	storage.axeSkill.set(0);
	storage.blowSkill.set(0);
	storage.rockSkill.set(0);
};
