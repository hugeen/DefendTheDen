define([
    'Underscore',
    'Crafty'
], function(_, Crafty) {
/*
    var hiddenCanvas = document.createElement('canvas'),
    hiddenBuffer = hiddenCanvas.getContext("2d");
    hiddenCanvas.style.display = "none";
    document.getElementById("cr-stage").appendChild(hiddenCanvas);

    Crafty.c("SpriteColor", {
    	_spriteColor: "rgba(0, 0, 0, 0)",
    	spriteColor: function(color){
    		this._spriteColor = color;
    		return this;
    	},
    	_drawSpriteColor: function(){
    		var co = this.__coord;
    		hiddenBuffer.drawImage(this.img, co[0], co[1], co[2], co[3], 0, 0, this._w, this._h);
    		hiddenBuffer.save();
    		hiddenBuffer.globalCompositeOperation = "source-in";
    		hiddenBuffer.fillStyle = this._spriteColor;
    		hiddenBuffer.fillRect(0, 0, this._w, this._h);
    		hiddenBuffer.restore();
    		Crafty.canvas.context.drawImage(hiddenCanvas, this._x, this._y);
    	},
    	init: function(){
    		this.bind("Draw", this._drawSpriteColor);
    		this.bind("RemoveComponent", function(c) {
    			if (c == "SpriteColor") this.unbind("Draw", this._drawSpriteColor);
    		})
    	},
    });
    */

});