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
		default:
			loadLevel(storage.level.get());
			break;
	}
};

var cutscenes = [];
cutscenes[1] = function() {
	$("body").append('<div class="wolfBig"></div><div class="pigBig"></div><div class="wolfSpeech"></div><div class="pigSpeech"></div>');
	$(".pigSpeech").hide();
	$(".wolfSpeech").hide();
	$(".wolfBig").animate({
		left: 0
	}, 1000);
	$(".pigBig").animate({
		right: -10
	}, 1000);
	setTimeout(function() {
		$(".pigSpeech").show();
		$(".pigSpeech").html("Hey YOU !");
	}, 1250);
	setTimeout(function() {
		$(".pigSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(". . . ?");
	}, 2750);
	setTimeout(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").show();
		$(".pigSpeech").html("You blew in my house !");
	}, 4250);
	setTimeout(function() {
		$(".pigSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(". . . !");
	}, 6000);
	setTimeout(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").show();
		$(".pigSpeech").html("It's time to <br/> Revenge ! ! !");
	}, 8250);
	
	setTimeout(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").hide();
		$(".wolfBig").animate({
			left: -300
		}, 1000);
		$(".pigBig").animate({
			right: -300
		}, 1000);
	}, 10000);
	
	setTimeout(function() {
		$(".wolfSpeech").remove();
		$(".pigSpeech").remove();
		$(".wolfBig").remove();
		$(".pigBig").remove();
		loadLevel(storage.level.get());
	}, 11000);
	
	setTimeout(function() {
		$("body").append('<div class="didacticiel01a"></div><div class="didacticiel01b"></div><div class="didacticiel01c"></div>');
		$(".didacticiel01a").html("To throw an Axe . . .");
		$(".didacticiel01b").html(" . . . Push Key '1'");
		$(".didacticiel01c").html(" . . . Click on an enmy");
	}, 11250);
	
	setTimeout(function() {
		$(".didacticiel01a").remove();
		$(".didacticiel01b").remove();
		$(".didacticiel01c").remove();
	}, 16500);

};


cutscenes[2] = function() {
	loadLevel(storage.level.get());
	setTimeout(function() {
		$("body").append('<div class="didacticiel01a"></div><div class="didacticiel01b"></div><div class="didacticiel01c"></div>');
		$(".didacticiel01a").html(" To blow on the enemy . . .");
		$(".didacticiel01b").html(" . . . Push Key '2'");
		$(".didacticiel01c").html(" . . . Be careful, it costs energy");
	}, 250);
	
	setTimeout(function() {
		$(".didacticiel01a").remove();
		$(".didacticiel01b").remove();
		$(".didacticiel01c").remove();
	}, 4250);

};

cutscenes[3] = function() {
	$("body").append('<div class="wolfBig"></div><div class="riddingBig"></div><div class="wolfSpeech"></div><div class="riddingSpeech"></div>');
	$(".riddingSpeech").hide();
	$(".wolfSpeech").hide();
	$(".wolfBig").animate({
		left: 0
	}, 1000);
	$(".riddingBig").animate({
		right: -10
	}, 1000);
	setTimeout(function() {
		$(".riddingSpeech").show();
		$(".riddingSpeech").html("Hey YOU !");
	}, 1250);
	setTimeout(function() {
		$(".riddingSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(" . . . WTF !?");
	}, 2750);
	setTimeout(function() {
		
		$(".wolfSpeech").hide();
		$(".riddingSpeech").show();
		$(".riddingSpeech").html("You ate my Grand'ma !");
	}, 4250);
	setTimeout(function() {
		$(".riddingSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(" . . . !");
	}, 6000);
	setTimeout(function() {
		$(".wolfSpeech").hide();
		$(".riddingSpeech").show();
		$(".riddingSpeech").html("It's time to <br/> Revenge ! ! !");
	}, 8250);
	
	setTimeout(function() {
		$(".wolfSpeech").hide();
		$(".riddingSpeech").hide();
		$(".wolfBig").animate({
			left: -300
		}, 1000);
		$(".riddingBig").animate({
			right: -300
		}, 1000);
	}, 10000);
	
	setTimeout(function() {
		$(".wolfSpeech").remove();
		$(".riddingSpeech").remove();
		$(".wolfBig").remove();
		$(".riddingBig").remove();
		loadLevel(storage.level.get());
	}, 11000);

};



cutscenes[4] = function() {
	loadLevel(storage.level.get());
	setTimeout(function() {
		$("body").append('<div class="didacticiel01a"></div><div class="didacticiel01b"></div><div class="didacticiel01c"></div>');
		$(".didacticiel01a").html(" To throw a Rock . . .");
		$(".didacticiel01b").html(" . . . Push Key '3'");
	}, 250);
	
	setTimeout(function() {
		$(".didacticiel01a").remove();
		$(".didacticiel01b").remove();
		$(".didacticiel01c").remove();
	}, 4250);

};