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
    if(storage.level.get() > 2) {
        buildSkillLine(DTD.skillList["Blow"], storage.blowSkill.get());
    }
    if(storage.level.get() > 4) {
        buildSkillLine(DTD.skillList["ThrowingBrick"], storage.rockSkill.get());
    }

};

var removeSkillShopUI = function() {
	 $(".skillShopUI").remove();
};

var buildSkillLine = function(skill, skillStorage) {
    var dmgDiv = '';
    var dmgUpDiv = '';
    var skillImg = '';
    var skillName = '';
    switch(skill.name) {
        case "Throwing Axe":
            skillImg = "axe-sprite"
            skillName = "ThrowingAxe";
            break;
        case "Blow":
            skillImg = "wind-skill"
            skillName = "Blow";
            break;
        case "Throwing Brick":
            skillImg = "rock-skill"
            skillName = "ThrowingBrick";
            break;
    }
    if(skill.stats[skillStorage].damageMin !== undefined) {
        dmgDiv = ''
        +'<div>'
            +'<span>Damages : </span>'
            +skill.stats[skillStorage].damageMin
            +'-'
            +skill.stats[skillStorage].damageMax
        +'</div>';
    }
    
    var skillUp = '';
    if(skillStorage < 2) {
        if(skill.stats[skillStorage+1].damageMin !== undefined) {
            dmgUpDiv = ''
            +'<div>'
                +'<span>Damages: </span>'
                +skill.stats[skillStorage+1].damageMin
                +'-'
                +skill.stats[skillStorage+1].damageMax
            +'</div>';
        }
        skillUp = ''
        +'<div class="skillStats" class="skillShopUI">'
            +'<div><b>'
                +skill.name
            +'</b> lvl '+(skillStorage+2)+'</div>'
            +dmgUpDiv
            +'<div>'
                +'<span>Cooldown : </span>'
                +skill.stats[skillStorage+1].coolDown
                +'s'
            +'</div>'
            +'<div>'
            +'Gold cost: <b>'
                +skill.stats[skillStorage+1].goldCost
            +'</b></div>'
        +'</div>';
    }
	$("#skillShopLines").append('<div id="skill_'+skill.key+'" class="skillLine" class="skillShopUI">'
		+'<div class="actualSkill" class="skillShopUI">'
    		+'<div class="skillPreview" class="skillShopUI">'
                +'<div><img src="img/'+skillImg+'.png" /></div>'
    		+'</div>'
    		+'<div class="skillStats" class="skillShopUI">'
        		+'<div><b>'
                    +skill.name
                +'</b> lvl '+(skillStorage+1)+'</div>'
                +dmgDiv
                +'<div>'
                    +'<span>Cooldown: </span>'
                    +skill.stats[skillStorage].coolDown
                    +'s'
                +'</div>'
            +'</div>'
		+'</div>'
		+'<div class="arrowUpgradeSkill" class="skillShopUI">'
		+'</div>'
		+'<div class="upgradeSkill" type="'+skillName+'" class="skillShopUI">'
    		+'<div class="skillPreview" class="skillShopUI">'
                +'<div><img src="img/'+skillImg+'.png" /></div>'
            +'</div>'
            +skillUp
		+'</div>'
	+'</div>');
	if(skillStorage < 2) {
	   if(skill.stats[skillStorage+1].goldCost > storage.goldCoins.get()) {
            $('#skill_'+skill.key+' .upgradeSkill').css("background-image", "url(img/bg-skill-not-enough-money.png)");
        } 
	} else {
	    $('#skill_'+skill.key+' .upgradeSkill, #skill_'+skill.key+' .arrowUpgradeSkill').remove();
	}
	
};
