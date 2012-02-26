(function() {

    DTD.loadCutScene = function() {
        if(cutscenes[storage.level.get()] !== undefined) {
            // destroy old cutscene
            if(DTD.playingCutscene) {
                $(".cutscene").remove();
                DTD.playingCutscene.destroy();
                DTD.playingCutscene = false;
            }
            // play new cutscene
            cutscenes[storage.level.get()].play();
        } else {
            DTD.loadLevel(storage.level.get());
        }
    };
    function Cutscene(characters) {
        this.characters = characters || false;
        this.delay = 0;
        this.timeline = [];
    }


    Cutscene.prototype.addSequence = function(type, delay, options) {
        this.options = options || {};
        this.delay += delay;
        this.timeline.push({
            type : type,
            options : options,
            delay : this.delay
        });
    };

    Cutscene.prototype.play = function() {
        this.e = Crafty.e("RealDelay");
        var that = this;
        DTD.playingCutscene = this.e;
        if(this.characters) {
            _.each(this.characters, function(character) {
                $("body").append('<div class="' + character + 'Big cutscene"></div>');
                $("body").append('<div class="' + character + 'Speech cutscene speech"></div>');
            });
        }
        $("body").append('<div class="didacticiel01a cutscene"></div>' + '<div class="didacticiel01b cutscene"></div>' + '<div class="didacticiel01c cutscene"></div>');
        $(".cutscene").hide();
        
        _.each(this.timeline, function(timeline) {
            that.e.realDelay(function() {
                switch(timeline.type) {

                    case 'characterAppear':

                        $("." + timeline.options.character + "Big").show();
                        if(timeline.options.direction == "left") {
                            $("." + timeline.options.character + "Big").animate({
                                left : 0
                            }, 800);
                        } else {
                            $("." + timeline.options.character + "Big").animate({
                                right : -10
                            }, 800);
                        }

                        break;

                    case 'characterDisappear':

                        $(".speech").hide();
                        if(timeline.options.direction == "left") {
                            $("." + timeline.options.character + "Big").animate({
                                left : -300
                            }, 800);
                        } else {
                            $("." + timeline.options.character + "Big").animate({
                                right : -300
                            }, 800);
                        }

                        break;

                    case 'speech':
                        if(timeline.options.hideOthers !== undefined) {
                            $(".speech").hide();
                        }
                        $("." + timeline.options.character + "Speech").show();
                        $("." + timeline.options.character + "Speech").html(timeline.options.text);

                        break;

                    case 'didacticiel':
                        if(timeline.options.hideOthers !== undefined) {
                            $(".didacticiel").hide();
                        }
                        $(".didacticiel01" + timeline.options.didacticiel).show();
                        $(".didacticiel01" + timeline.options.didacticiel).html(timeline.options.text);
                        break;

                    case 'clearCutscene':
                        $(".hide").remove();
                        $(".cutscene").remove();
                        DTD.playingCutscene.destroy();
                        DTD.playingCutscene = false;
                        break;

                    case 'launchGame':
                        DTD.loadLevel(storage.level.get());
                        break;
                }

            }, timeline.delay * 1000);
        });
    };
    /*
     * Scenes
     */
    var cutscenes = [];
    /*
     * #1-Scene with Pig
     */
    cutscenes[1] = new Cutscene(["wolf", "pig"]);
    cutscenes[1].addSequence("characterAppear", 0.2, {
        direction : "left",
        character : "wolf"
    });
    cutscenes[1].addSequence("characterAppear", 0.2, {
        direction : "right",
        character : "pig"
    });
    cutscenes[1].addSequence("speech", 1, {
        hideOthers : true,
        character : "pig",
        text : "Hey you!"
    });
    cutscenes[1].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "wolf",
        text : ". . . ?"
    });
    cutscenes[1].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "pig",
        text : "You blew on my house !"
    });
    cutscenes[1].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "wolf",
        text : ". . . !"
    });
    cutscenes[1].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "pig",
        text : "You will pay for that !"
    });
    cutscenes[1].addSequence("characterDisappear", 2.5, {
        direction : "left",
        character : "wolf"
    });
    cutscenes[1].addSequence("characterDisappear", 0, {
        direction : "right",
        character : "pig"
    });
    cutscenes[1].addSequence("launchGame", 1);
    cutscenes[1].addSequence("didacticiel", 0.5, {
        didacticiel : "a",
        text : "To throw an Axe . . ."
    });
    cutscenes[1].addSequence("didacticiel", 1.5, {
        didacticiel : "b",
        text : " . . . Push Key '1'"
    });
    cutscenes[1].addSequence("clearCutscene", 2.5);

    /*
     * #2-Scene
     */
    cutscenes[2] = new Cutscene();
    cutscenes[2].addSequence("launchGame", 0.2);
    cutscenes[2].addSequence("didacticiel", 0.5, {
        didacticiel : "a",
        text : "To blow on the enemy . . ."
    });
    cutscenes[2].addSequence("didacticiel", 1.5, {
        didacticiel : "b",
        text : " Push Key '2'"
    });
    cutscenes[2].addSequence("didacticiel", 1.5, {
        didacticiel : "c",
        text : "  . . . Be careful, it costs energy"
    });
    cutscenes[2].addSequence("clearCutscene", 2.5);

    /*
     * #3-Scene with Ridding
     */
    cutscenes[3] = new Cutscene(["wolf", "ridding"]);
    cutscenes[3].addSequence("characterAppear", 0.2, {
        direction : "left",
        character : "wolf"
    });
    cutscenes[3].addSequence("characterAppear", 0.2, {
        direction : "right",
        character : "ridding"
    });
    cutscenes[3].addSequence("speech", 1, {
        hideOthers : true,
        character : "ridding",
        text : " Hey you!"
    });
    cutscenes[3].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "wolf",
        text : " . . . WTF !?"
    });
    cutscenes[3].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "ridding",
        text : "You ate my Grand'ma !"
    });
    cutscenes[3].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "wolf",
        text : ". . . !"
    });
    cutscenes[3].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "ridding",
        text : "It's time to <br/> Revenge !"
    });
    cutscenes[3].addSequence("characterDisappear", 2.5, {
        direction : "left",
        character : "wolf"
    });
    cutscenes[3].addSequence("characterDisappear", 0, {
        direction : "right",
        character : "ridding"
    });
    cutscenes[3].addSequence("launchGame", 1);
    cutscenes[3].addSequence("clearCutscene", 2.5);

    /*
     * #4-Scene
     */
    cutscenes[4] = new Cutscene();
    cutscenes[4].addSequence("launchGame", 0.2);
    cutscenes[4].addSequence("didacticiel", 0.5, {
        didacticiel : "a",
        text : " To throw a Rock . . ."
    });
    cutscenes[4].addSequence("didacticiel", 1.5, {
        didacticiel : "b",
        text : " . . . Push Key '3'"
    });
    cutscenes[4].addSequence("clearCutscene", 2.5);

    /*
     * #2-Scene with Granny
     */
    cutscenes[5] = new Cutscene(["wolf", "granny"]);
    cutscenes[5].addSequence("characterAppear", 0.2, {
        direction : "left",
        character : "wolf"
    });
    cutscenes[5].addSequence("characterAppear", 0.2, {
        direction : "right",
        character : "granny"
    });
    cutscenes[5].addSequence("speech", 1, {
        hideOthers : true,
        character : "granny",
        text : " Hello wolfy ! "
    });
    cutscenes[5].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "wolf",
        text : " Unbelievable ... "
    });
    cutscenes[5].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "granny",
        text : " What big teeth you have! "
    });
    cutscenes[5].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "wolf",
        text : " What do you want Granny ?"
    });
    cutscenes[5].addSequence("speech", 2.5, {
        hideOthers : true,
        character : "granny",
        text : " I want you dead! "
    });
    cutscenes[5].addSequence("characterDisappear", 2.5, {
        direction : "left",
        character : "wolf"
    });
    cutscenes[5].addSequence("characterDisappear", 0, {
        direction : "right",
        character : "granny"
    });
    cutscenes[5].addSequence("launchGame", 1);
    cutscenes[5].addSequence("clearCutscene", 2.5);

})();
