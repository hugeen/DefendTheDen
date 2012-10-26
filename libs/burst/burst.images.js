define([
    "Underscore",
    "Burst"
], function(_, Burst) {
    
    return {
        
        rgbToHsl: function(r, g, b){
            r /= 255;
            g /= 255;
            b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if(max == min){
                h = s = 0;
            }else{
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [h, s, l];
        },
        
        hslToRgb: function (h, s, l){
            var r, g, b;
            if(s == 0){
                r = g = b = l;
            }else{
                function hue2rgb(p, q, t){
                    if(t < 0) {t += 1;}
                    if(t > 1) {t -= 1;}
                    if(t < 1/6) {return p + (q - p) * 6 * t;}
                    if(t < 1/2) {return q;}
                    if(t < 2/3) {return p + (q - p) * (2/3 - t) * 6;}
                    return p;
                }
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            return [r * 255, g * 255, b * 255];
        },

        ManipulableImage: function(image) {
            if(_.isString(image)) {
                // create image tag & wait for loading
            }

            var canvas = document.createElement("canvas");
            _.extend(canvas, {
                width: image.width,
                height: image.height
            });

            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);

            var imageData = context.getImageData(0, 0, image.width, image.height);
            var pixelMatrix = imageData.data;

            this.dataUrl = function() {
                return canvas.toDataURL();
            };

            this.updateHsl = function(destroy) {
                
                for (var i = 0, n = pixelMatrix.length; i < n; i += 4) {
                    var hsl = object.rgbToHsl(pixelMatrix[i], pixelMatrix[i+1], pixelMatrix[i+2]);

                    if(typeof HSLparams.saturation !== "undefined") {
                        hsl[0] = (hsl[0] + HSLparams.hue || 0) % 1;
                    }

                    if(typeof HSLparams.saturation !== "undefined") {
                        hsl[1] = Math.max(Math.min(hsl[1] + HSLparams.saturation,1), 0);
                        /*if(HSLparams.saturation >= 1) {
                            hsl[1] = 1 - (1 - hsl[1])/HSLparams.saturation;
                        } else if (HSLparams.saturation <= -1) {
                            hsl[1] = hsl[1]/HSLparams.saturation;
                        }*/
                    }

                    if(typeof HSLparams.lightness !== "undefined") {
                        hsl[2] = Math.max(Math.min(hsl[2] + HSLparams.lightness,1), 0);
                        /*
                        if(HSLparams.lightness >= 1) {
                            hsl[2] = 1 - (1 - hsl[2])/HSLparams.lightness;
                        } else if (HSLparams.lightness <= -1) {
                            hsl[2] = hsl[2]/HSLparams.lightness;
                        }*/
                    }

                    var newRgb = object.hslToRgb(hsl[0], hsl[1], hsl[2]);
                    pixelMatrix[i]   = newRgb[0];
                    pixelMatrix[i+1] = newRgb[1];
                    pixelMatrix[i+2] = newRgb[2];
                    pixelMatrix[i+3] = alpha || pixelMatrix[i+3];
                }

                context.putImageData(imageData, 0, 0);

                this.dataUrl = canvas.toDataURL();

                if(destroy) {
                    this.destroy();
                }

                return this.dataUrl;
            };

            this.destroy = function() {
                canvas.parentNode.removeChild(canvas);
            };

        }
        
    };

});
