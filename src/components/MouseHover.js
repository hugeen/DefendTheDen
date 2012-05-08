Crafty.c('MouseHover', {
    init: function() {
        this.requires("Mouse")        
        this.bind('MouseOver', function(){
            document.body.style.cursor = "pointer";
        });
        this.bind('MouseOut', function(){
            document.body.style.cursor = "default";
        });
    
        return this;
    }
});