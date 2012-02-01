var soundResources = {
	titleScreen: "462638_Travels_of_Vagabonds.ogg",
	wound: "Vampire_Bite_SoundBible.ogg",
	pigDie: "Whip_SoundBible.ogg",
	howl: "Werewolf_Howl_SoundBible.ogg",
	breath: "Breathing_Weird_SoundBible.ogg",
	throwing: "spin_jump_Brandino480_2020916281.ogg",
	goldCoin: "Metal_Reflect_SoundBible.ogg"
};
/*
Crafty.audio.add({
	throwing: "audio/spin_jump_Brandino480_2020916281.ogg",
    wound: "audio/Vampire_Bite_SoundBible.ogg",
    pigDie: "audio/Whip_SoundBible.ogg"
});
*/
Crafty.audio.add("titleScreen", "audio/462638_Travels_of_Vagabonds.ogg");
Crafty.audio.add("wound", "audio/Vampire_Bite_SoundBible.ogg");
Crafty.audio.add("pigDie", "audio/Whip_SoundBible.ogg");
Crafty.audio.add("howl", "audio/Werewolf_Howl_SoundBible.ogg");
Crafty.audio.add("breath", "audio/Breathing_Weird_SoundBible.ogg");
Crafty.audio.add("throwing", "audio/spin_jump_Brandino480_2020916281.ogg");
Crafty.audio.add("goldCoin", "audio/Metal_Reflect_SoundBible.ogg");

var maxVolume = 80;
var soundManager = [];
var soundIds = 0;

// preload audio files
$(document).ready(function() {
	_.each(soundResources, function(item, key){ 
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', 'audio/'+item);
		audioElement.setAttribute('type', 'audio/ogg');
		audioElement.setAttribute('preload', 'auto');
		$("body").append(audioElement);
	});	
});

var changeGlobalVolume = function(volume) {
	soundVolumeStorage.set(volume);
	_.each(soundManager, function(item, key) {
		item.refreshVolume();
	});
};

function Sound(file, params) {
	this.file = file;
	this.params = params || {};
	_.defaults(this.params, {
		loop: false,
		type: 'effect',
		volume: 100,
		destroyIn: false
	});
	this.$e = document.createElement('audio');
	this.$e.setAttribute('src', 'audio/'+file);
	this.$e.setAttribute('type', 'audio/ogg');
	if(this.params.loop) {
		this.$e.setAttribute('loop', 'loop');
	}
	this.jqueryElement = $(this.$e);
	$("body").append(this.$e);
	this.id = soundIds++;
	soundManager[soundIds] = this;
	if(this.params.destroyIn) {
		var that = this;
		setTimeout(function() {	
			delete soundManager[that.id];
			that.jqueryElement.remove();
		}, that.params.destroyIn);
	}
	this.refreshVolume();
}

Sound.prototype.play = function() {
	this.$e.play(); 
};

Sound.prototype.refreshVolume = function() {
	this.$e.volume=(maxVolume*(this.params.volume/100))*(soundVolumeStorage.get()/100)/100;
};


var screenMusic = function() {
	/*
	var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/462638_Travels_of_Vagabonds.ogg');
    audioElement.setAttribute('type', 'audio/ogg');
    audioElement.setAttribute('preload', 'auto');
    audioElement.setAttribute('loop', 'loop');
    $("body").append(audioElement);
    audioElement.volume = 1;
    audioElement.play();
   	*/
	/*
    audioElement.addEventListener("load", function() {
    	console.log("launched");
    	audioElement.volume = 1;
        audioElement.play();
        $(".duration span").html(audioElement.duration);
        $(".filename span").html(audioElement.src);
    }, true);
    $('.play').click(function() {
        audioElement.play();

    });
    $('.pause').click(function() {
        audioElement.pause();
    });
    $('.volumeMax').click(function() {
        audioElement.volume = 1;
    });
    $('.volumestop').click(function() {
        audioElement.volume = 0;
    });
    $('.playatTime').click(function() {
        audioElement.currentTime = 35;
        audioElement.play();
    });
    */
};
/**/