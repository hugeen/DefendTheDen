var buildSkillShopUI = function() {
    $("body").append(+''
    	+ '<div id="skillShop" class="skillShopUI">'
    		+'<div id="skillShopGolds" class="skillShopUI"><div>Golds:<span class="skillShopUI">'+storage.goldCoins.get()+'</span></div></div>'
    		+'<div id="skillShopLines" class="skillShopUI"></div>'
    		+'<a id="skillShopBack" class="skillShopUI"><span class="skillShopUI">Back to main screen</span></a>'
    		+'<a id="skillShopPlay" class="skillShopUI"><span class="skillShopUI">Play</span></a>'
    	+ '</div>'
    	+ '');
    
    buildSkillLine(DTD.skillList["ThrowingAxe"], storage.axeSkill.get());
    $("skillShop").html();

};

var removeSkillShopUI = function() {
	 $(".skillShopUI").remove();
};

var buildSkillLine = function(skill, skillStorage) {
	$("skillShopLines").append('<div class="skillLine" class="skillShopUI">'
		+'<div class="actualSkill" class="skillShopUI"'
		+'</div>'
		+'<div class="arrowUpgradeSkill" class="skillShopUI">'
		+'</div>'
		+'<div class="upgradeSkill" class="skillShopUI">'
		+'</div>'
	+'</div>');
};
