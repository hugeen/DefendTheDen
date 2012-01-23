Crafty.c("PlaceTrapSkill", {
    init: function() {
        this.addComponent("SkillButton");
        this.bind('KeyUp', function(e) {
            if(e.keyCode === Crafty.keys["2"]) {
                DefendTheDen.selectedSkill = "PlaceTrapSkill";
            }
        });
        this.bind("Click", function() {
            DefendTheDen.selectedSkill = "PlaceTrapSkill";
        });
        this.color("#ccc");
    }
});