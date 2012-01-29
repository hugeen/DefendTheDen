var loadCutScene = function() {
	switch(storage.level.get()) {
		case 1: 
			cutscenes[1]();
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
		$(".pigSpeech").html("You breath on my HOUSE !");
	}, 4250);
	setTimeout(function() {
		$(".pigSpeech").hide();
		$(".wolfSpeech").show();
		$(".wolfSpeech").html(". . . !");
	}, 6000);
	setTimeout(function() {
		$(".wolfSpeech").hide();
		$(".pigSpeech").show();
		$(".pigSpeech").html("Revenge ! ! !");
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

};
