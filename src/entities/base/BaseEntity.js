var BaseEntity = Backbone.Model.extend({
	defaults: {
        'entity' : null
    },
    initialize: function(){
    
    },
    getEntity : function(){
        return this.get('entity');
    },
    remove : function(){
        var entity = this.getEntity();

        if (entity) {
            entity.destroy();
        }
    }
});