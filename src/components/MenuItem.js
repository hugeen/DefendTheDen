Crafty.c('MenuItem', {
    init: function() {
        this.addComponent("2D, Canvas, Text, Mouse, MouseHover");
        this.attr({x: 275, y: 280, w: 300, h: 38 });
        this.textColor('#FFFFFF', 0.6);
        this.textFont({ size: '38px', type: 'italic', family: "'Marck Script', cursive" });
        this.bind('MouseOver', function(){
            this.textColor('#FFFFFF', 1);
        });
        this.bind('MouseOut', function(){
            this.textColor('#FFFFFF', 0.6);
        });
        return this;
    }
});
