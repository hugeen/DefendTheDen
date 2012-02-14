var loadCutScene = function() {
	switch(storage.level.get()) {
		case 1: 
			cutscenes[1]();
			break;
		case 2: 
			cutscenes[2]();
			break;
		case 3: 
			cutscenes[3]();
			break;
	    case 4: 
            cutscenes[4]();
            break;
        case 5: 
            cutscenes[5]();
            break;
		default:
			loadLevel(storage.level.get());
			break;
	}
};

var cutscenes = [];
cutscenes[1] = function() {
	if(DTD.playingCutscene) {
		$(".cutscene").remove();
		DTD.playingCutscene.destroy();
		DTD.playingCutscene = false;
	}
	var cut = Crafty.e("RealDelay");
	DTD.playingCutscene = cut;
	$("body").append('<div class="wolfBig cutscene"></div><div class="pigBig cutscene"></div><div class="wolfSpeech cutscene"></div><div class="pigSpeech cutscene"></div>');
	$(".pigSpeech").hide();
	$(".wolfSpeech").hide();
	cut.realDelay(function() {
		$(".wolfBig").animate({
			left: 0
		}, 800);
		$(".pigBig").animate({
			right: -10
		}, 800);
	},200);
	cut.realDelay(function() {
		$(".pigSpeech").show();
		$(".pigSpeech").html("Hey YOU !");
	}, 1250);
	cut.realDelay(function() {
		$(".pigSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(". . . ?");
	}, 2750);
	cut.realDelay(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").show();
		$(".pigSpeech").html("You blew in my house !");
	}, 4250);
	cut.realDelay(function() {
		$(".pigSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(". . . !");
	}, 6000);
	cut.realDelay(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").show();
		$(".pigSpeech").html("It's time to <br/> Revenge ! ! !");
	}, 8250);
	cut.realDelay(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").hide();
		$(".wolfBig").animate({
			left: -300
		}, 800);
		$(".pigBig").animate({
			right: -300
		}, 800);
	}, 10000);
	cut.realDelay(function() {
		$(".wolfSpeech").remove();
		$(".pigSpeech").remove();
		$(".wolfBig").remove();
		$(".pigBig").remove();
		loadLevel(storage.level.get());
	}, 11000);
	cut.realDelay(function() {
		$("body").append('<div class="didacticiel01a cutscene"></div><div class="didacticiel01b cutscene"></div>');
		$(".didacticiel01a").html("To throw an Axe . . .");
		$(".didacticiel01b").html(" . . . Push Key '1'");
	}, 11250);
	cut.realDelay(function() {
		$(".didacticiel01a").remove();
		$(".didacticiel01b").remove();
	}, 16500);

};


cutscenes[2] = function() {
	if(DTD.playingCutscene) {
		$(".cutscene").remove();
		DTD.playingCutscene.destroy();
		DTD.playingCutscene = false;
	}
	var cut = Crafty.e("RealDelay");
	DTD.playingCutscene = cut;
	loadLevel(storage.level.get());
	cut.realDelay(function() {
		$("body").append('<div class="didacticiel01a cutscene"></div><div class="didacticiel01b cutscene"></div><div class="didacticiel01c cutscene"></div>');
		$(".didacticiel01a").html(" To blow on the enemy . . .");
		$(".didacticiel01b").html(" . . . Push Key '2'");
		$(".didacticiel01c").html(" . . . Be careful, it costs energy");
	}, 250);
	
	cut.realDelay(function() {
		$(".didacticiel01a").remove();
		$(".didacticiel01b").remove();
		$(".didacticiel01c").remove();
	}, 4250);

};

cutscenes[3] = function() {
	if(DTD.playingCutscene) {
		$(".cutscene").remove();
		DTD.playingCutscene.destroy();
		DTD.playingCutscene = false;
	}
	var cut = Crafty.e("RealDelay");
	DTD.playingCutscene = cut;
	$("body").append('<div class="wolfBig cutscene"></div><div class="riddingBig cutscene"></div><div class="wolfSpeech cutscene"></div><div class="riddingSpeech cutscene"></div>');
	$(".riddingSpeech").hide();
	$(".wolfSpeech").hide();
	$(".wolfBig").animate({
		left: 0
	}, 1000);
	$(".riddingBig").animate({
		right: -10
	}, 1000);
	cut.realDelay(function() {
		$(".riddingSpeech").show();
		$(".riddingSpeech").html("Hey YOU !");
	}, 1250);
	cut.realDelay(function() {
		$(".riddingSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(" . . . WTF !?");
	}, 2750);
	cut.realDelay(function() {
		
		$(".wolfSpeech").hide();
		$(".riddingSpeech").show();
		$(".riddingSpeech").html("You ate my Grand'ma !");
	}, 4250);
	cut.realDelay(function() {
		$(".riddingSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(" . . . !");
	}, 6000);
	cut.realDelay(function() {
		$(".wolfSpeech").hide();
		$(".riddingSpeech").show();
		$(".riddingSpeech").html("It's time to <br/> Revenge !");
	}, 8250);
	
	cut.realDelay(function() {
		$(".wolfSpeech").hide();
		$(".riddingSpeech").hide();
		$(".wolfBig").animate({
			left: -300
		}, 1000);
		$(".riddingBig").animate({
			right: -300
		}, 1000);
	}, 10000);
	
	cut.realDelay(function() {
		$(".wolfSpeech").remove();
		$(".riddingSpeech").remove();
		$(".wolfBig").remove();
		$(".riddingBig").remove();
		loadLevel(storage.level.get());
	}, 11000);

};

cutscenes[4] = function() {
	if(DTD.playingCutscene) {
		$(".cutscene").remove();
		DTD.playingCutscene.destroy();
		DTD.playingCutscene = false;
	}
	var cut = Crafty.e("RealDelay");
	DTD.playingCutscene = cut;
	loadLevel(storage.level.get());
	cut.realDelay(function() {
		$("body").append('<div class="didacticiel01a cutscene"></div><div class="didacticiel01b cutscene"></div>');
		$(".didacticiel01a").html(" To throw a Rock . . .");
		$(".didacticiel01b").html(" . . . Push Key '3'");
	}, 250);
	
	cut.realDelay(function() {
		$(".didacticiel01a").remove();
		$(".didacticiel01b").remove();
		$(".didacticiel01c").remove();
	}, 4250);

};


cutscenes[5] = function() {
    if(DTD.playingCutscene) {
        $(".cutscene").remove();
        DTD.playingCutscene.destroy();
        DTD.playingCutscene = false;
    }
    var cut = Crafty.e("RealDelay");
    DTD.playingCutscene = cut;
    $("body").append('<div class="wolfBig cutscene"></div><div class="grannyBig cutscene"></div><div class="wolfSpeech cutscene"></div><div class="grannySpeech cutscene"></div>');
    $(".grannySpeech").hide();
    $(".wolfSpeech").hide();
    $(".wolfBig").animate({
        left: 0
    }, 1000);
    $(".grannyBig").animate({
        right: -10
    }, 1000);
    cut.realDelay(function() {
        $(".grannySpeech").show();
        $(".grannySpeech").html(" Hello wolfy ! ");
    }, 1250);
    cut.realDelay(function() {
        $(".grannySpeech").hide();
        $(".wolfSpeech").show();
        $(".wolfSpeech").html(" Unbelievable ... ");
    }, 3000);
    cut.realDelay(function() {
        $(".wolfSpeech").hide();
        $(".grannySpeech").show();
        $(".grannySpeech").html(" What big teeth you have! ");
    }, 4500);
    cut.realDelay(function() {
        $(".grannySpeech").hide();
        $(".wolfSpeech").show();
        $(".wolfSpeech").html(" What do you want Granny ?");
    }, 7000);
    cut.realDelay(function() {
        $(".wolfSpeech").hide();
        $(".grannySpeech").show();
        $(".grannySpeech").html(" I want you dead ! ");
    }, 10000);
    
    cut.realDelay(function() {
        $(".wolfSpeech").hide();
        $(".grannySpeech").hide();
        $(".wolfBig").animate({
            left: -300
        }, 1000);
        $(".grannyBig").animate({
            right: -300
        }, 1000);
    }, 12000);
    
    cut.realDelay(function() {
        $(".wolfSpeech").remove();
        $(".grannySpeech").remove();
        $(".wolfBig").remove();
        $(".grannyBig").remove();
        loadLevel(storage.level.get());
    }, 13000);

};