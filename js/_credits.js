function buildCreditsUI() {
    $("body").append('<a id="creditsBack" class="creditsUI"><span class="creditsUI">Back to main screen</span></a>');
    $("body").append('<div id="credits" class="creditsUI"></div>');
    $("#credits").append('<div class="wrapper creditsUI">'
        +'<h1 class="creditsUI">Development</h1>'
        +'<div class="creditsUI">by <a href="http://hugeen.tumblr.com/" class="extLink creditsUI">Cyrille Bogaert</a> from <b>Toxicode</b> (Hugeen)</div>'
        +'<h1 class="creditsUI">Sprites</h1>'
        +'<div class="creditsUI">by <a href="http://www.flickr.com/photos/75683839@N03/" class="extLink creditsUI">Lakmé Mosnier</a> (Muneen)</div>'
        +'<h1 class="creditsUI">Music Theme</h1>'
        +'<div class="creditsUI">by <a href="http://www.toxicode.fr/" class="extLink creditsUI">Pierre Lancien</a> from <b>Toxicode</b> (Ekeynox)</div>'
        +'<h1 class="creditsUI">HTML5 Framework</h1>'
        +'<div class="creditsUI"><a href="http://craftyjs.com/" class="extLink creditsUI">Crafty</a></div>'
    +'</div>');
    
}

function removeCreditsUI() {
    $(".creditsUI").remove();
}
