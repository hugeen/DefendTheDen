/**
 * Author: Sean Colombo
 * Date: 20120202
 *
 * AudioManager which handles HTML5 audio.
 *
 * NOTE: THIS IS ORIGINALLY JUST FOR Pokki, SO IT DOESN'T TAKE CARE OF FIXING THE FACT THAT DIFFERENT
 * BROWSERS CURRENTLY ONLY SUPPORT SOME AUDIO FORMATS (and no format is supported on all browser at
 * the moment).
 *
 * LATER: Make this accept aliases for the soundName to be associated with files of several types and
 * automatically choose the best filetype based on the browser's capabilities. This should help figure
 * it out:
 * http://html5doctor.com/native-audio-in-the-browser/
 */
 
// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

if (typeof Proximity === 'undefined') {
	Proximity = {};
}

if (typeof Proximity.AudioManager === 'undefined') {
	/**
	 * Class for managing the sounds in Proximity.  Audio is pretty striaghtforward in HTML5... this class
	 * mainly helps by handling loading.
	 */

	Proximity.AudioManager = function(){
		var self = this;
		this.debug = false;
		this.MAX_CONCURRENT_SAME_SOUND = 1;

		this.soundFiles = {
			// WARNING: I've heard rumors that 8 is the max number of audio files before Chrome starts bugging out.
			'howl': 'audio/_howl.ogg'
		};
		this.musicFiles = {
			'music_ekeynox': 'audio/music_ekeynox.ogg'
		};

		// Caches actual Audio objects.
		this.activeSoundCache = {}; // hash of array of sounds that are still playing. Key is sound name, value is hash of audio key to audio objects.
		this.playableSounds = {}; // hash of array sounds that have finished playing & can be played again. Key is sound name, value is array of audio objects.
		this.musicCache = {}; // Key is sound name, value is an audio object.
		
		// Track the number of plays: total and by sound (to help chase the Chrome audio bugs).
		this.totalPlays = 0;
		this.playCountBySound = {};
		this.numSoundsCreated = 0;
		this.numMusicCreated = 0;

		/**
		 * Given the sound name (a key from the self.soundFiles object above), play that sound.
		 */
		this.playSound = function(soundName){
			var audioObj;

			// Only play the sound if sound-effects (sfx) are currently enabled.
			if(ProximityApp.config.sfxEnabled){
				if(self.soundFiles[ soundName ]){
					if(typeof self.activeSoundCache[soundName] == "undefined"){
						self.activeSoundCache[soundName] = {};
					}

					// Need to get an audioObjKey which will be a unique identifier for this run of this audio object.
					var audioObjKey = soundName + ":" + self.totalPlays;
					
					// Only allow a certain number of the same sound to play concurrently.
					if(Object.keys(self.activeSoundCache[soundName]).length < self.MAX_CONCURRENT_SAME_SOUND){
						// Either grab an existing audio object (which is fully played out and ready to be replayed) or create another audio object.
						if(self.playableSounds[soundName] && (self.playableSounds[soundName].length > 0)){
							self.log("Found a playable version of '" + soundName + "'. Replaying this instead of creating a new audio object.");

							// Grab the audio object out of the cache of playable sounds.
							audioObj = self.playableSounds[ soundName ][0];
							Array.remove( self.playableSounds[ soundName ], 0 );

							// Put the audio object into the cache of currently active (playing) sounds.
							self.activeSoundCache[soundName][audioObjKey] = audioObj;
						} else {
							self.log("No suitable playable version of '" + soundName + "' is available. Creating one.");
							
							self.activeSoundCache[soundName][audioObjKey] = new Audio( self.soundFiles[soundName] );

							self.numSoundsCreated++;
							self.log("Number of new sounds created: " + self.numSoundsCreated);
						}

						// When the sound is done playing, add it to the array of replayable sounds.
						self.activeSoundCache[soundName][audioObjKey].addEventListener('ended', function() {
							self.log("Finished playing '" + audioObjKey + "'. Moving it to cache of playable sounds.");
							self.activeSoundCache[soundName][audioObjKey].removeEventListener('ended', arguments.callee, false);

							// Now that the sound has finished playing, move it over to the cache of playable versions of this sound.
							var finishedAudioObj = self.activeSoundCache[soundName][audioObjKey];
							if(typeof self.playableSounds[soundName] == "undefined"){
								self.playableSounds[soundName] = new Array();
							}
							self.playableSounds[soundName].push( finishedAudioObj );
							delete self.activeSoundCache[soundName][audioObjKey];
						}, false);

						// ACTUALLY PLAY THE SOUND!
						self.log("\tAbout to play: '" + audioObjKey + "'");
						self.activeSoundCache[soundName][audioObjKey].play();
						self.log("\tPlayed: '" + soundName + "'"); // intentionally over-logging for now since Audio has been wonky.
						
						// Play-counting. - COOL STATS, NOT NEEDED IN PRODUCTION. COMMENTED OUT FOR FINAL BUILD.
						//var prefix = "sfx:";
						//self.totalPlays++;
						//if(self.playCountBySound[prefix + soundName]){
						//	self.playCountBySound[prefix + soundName]++;
						//} else {
						//	self.playCountBySound[prefix + soundName] = 1;
						//}
						//self.log("Total play-count: " + self.totalPlays);
						//self.log("Plays of '" + prefix + soundName + "': " + self.playCountBySound[prefix + soundName]);
					}
				} else {
					self.log("Tried to play invalid sound: " + soundName);
				}
			}
		};

		/**
		 * Starts playing the music with the given name.  All music loops.
		 */
		this.playMusic = function(musicName){
			// Only play the music if music is currently enabled.
			if(ProximityApp.config.musicEnabled){
				if(self.musicFiles[ musicName ]){
					if(typeof self.musicCache[ musicName ] == "undefined"){
						self.log("Music object was not found for: '" + musicName + "'. Creating one.");
						self.musicCache[ musicName ] = new Audio( self.musicFiles[ musicName ] );
						
						self.numMusicCreated++;
						self.log("Number of new music objects created: " + self.numMusicCreated);
					}

					// Music loops, sfx don't.
					self.musicCache[musicName].loop = true;
					//LATER: The non-webkit way since FF doesn't do .loop as of now. Basically just need to test this:
					//self.musicCache[musicName].addEventListener('ended', function() {
					//	this.currentTime = 0;
					//	this.play();
					//}, false);
					
					// ACTUALLY PLAY THE MUSIC!
					self.log("\tAbout to play music: '" + musicName + "'");
					self.musicCache[musicName].play();
					self.log("\tPlayed music: '" + musicName + "'");

					// Play-counting. - COOL STATS, NOT NEEDED IN PRODUCTION. COMMENTED OUT FOR FINAL BUILD.
					//var prefix = "music:";
					//self.totalPlays++;
					//if(self.playCountBySound[prefix + musicName]){
					//	self.playCountBySound[prefix + musicName]++;
					//} else {
					//	self.playCountBySound[prefix + musicName] = 1;
					//}
					//self.log("Total play-count: " + self.totalPlays);
					//self.log("Plays of '" + prefix + musicName + "': " + self.playCountBySound[prefix + musicName]);
				} else {
					self.log("Tried to play invalid sound: " + musicName);
				}
			}
		};

		/**
		 * Given the sound name (a key from the self.soundFiles object above), try to pause that
		 * sound if it's already playing.
		 */
		this.pauseSound = function(soundName){
			if(self.activeSoundCache[ soundName ]){
				for(var soundKey in self.activeSoundCache[soundName]){
					self.log("\t\tAbout to pause instance of "+ soundName + " with id: " + soundKey);
					self.activeSoundCache[soundName][soundKey].pause();

					// Remove the reference and discard it (we don't want to resume an SFX part-way through.
					delete self.activeSoundCache[soundName][soundKey];

					self.log("\t\tPaused: " + soundKey);
				}
				self.log("\tPaused: " + soundName);
			} else {
				self.log("Tried to pause sound which isn't playing: " + soundName);
			}
		};

		/**
		 * Given the name of some music, pause it if it is already playing.
		 */
		this.pauseMusic = function( musicName ){
			if(self.musicCache[ musicName ]){
				self.log("\tAbout to pause music: " + musicName);
				self.musicCache[musicName].pause();
				self.log("\tPaused music: " + musicName);
			} else {
				self.log("Tried to pause music which hasn't been started: " + musicName);
			}
		};

		/**
		 * Pauses all playing sounds.  This is useful if the user 'mute's the app.
		 */
		this.pauseAll = function(){
			self.pauseAllMusic();
			self.pauseAllSounds();
		};
		
		/**
		 * Pauses all currently playing music (not sound effects).  Based off of the musicKeys array.
		 */
		this.pauseAllSounds = function(){
			self.log("Pausing all sounds!");
			for(var soundName in self.activeSoundCache){
				self.pauseSound( soundName );
			}
		};
		
		/**
		 * Pauses all currently playing music (not sound effects).
		 */
		this.pauseAllMusic = function(){
			self.log("Pausing all music!");
			for(var musicName in self.musicCache){
				self.pauseMusic( musicName );
			}
		};

		/**
		 * Simple wrapper for console.log to allow us to turn on/off debugging for this
		 * whole class at once.
		 */
		this.log = function(msg){
			if(self.debug){
				if (typeof console == "undefined") {
					window.console = {
						log: function () {}
					};
				}

				console.log(msg);
			}
		};
	};
}
