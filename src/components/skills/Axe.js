Crafty.c("Axe", {
    init : function() {
        this._used = false;
        this.addComponent("Bullet, axe");
        this.origin("center");
        this.bind("Fired", function() {
           this.bind("EnterFrame", function(){
              this.attr({
                  rotation: this.rotation+12
              });
           });
        });
    }
});