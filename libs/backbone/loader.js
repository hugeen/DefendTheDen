define(['order!../libs/jquery/jquery-min', 'order!../libs/underscore/underscore-min', 'order!../libs/backbone/backbone-min', 'order!../libs/crafty/crafty-src', 'order!../libs/bootstrap/bootstrap.min'],
function(){
  return {
    Backbone: Backbone.noConflict(),
    _: _.noConflict(),
    $: jQuery.noConflict(),
    Crafty: Crafty,
    Bootstrap: jQuery
  };
});
