define([
    'underscore',
    'game/viewport',
    'libs/box2d/box2d'
], function(_, viewport, Box2D) {

    return {
        entityParser: function(code) {
            return {
                "p": "Pig",
                "o": "Octocat",
                "r": "RiddingHood",
                "g": "Granny",
                "!": "Nobody"
            }[code];
        },
        takeDamages: function(entity, damages) {
            entity.takeDamages(damages);
            Crafty.e("Damages").display(damages, { x: entity._x, y: entity._y });
        },
        roll: function(percent) {
            return _.random(0,100) > 100 - percent;
        },
        outOfBounds: function(entity) {
            return !(entity.x < viewport.width && entity.x > 0 && entity.y < viewport.height && entity.y > 0);
        },
        box2D: {
            Vec2: Box2D.Common.Math.b2Vec2,
            BodyDef: Box2D.Dynamics.b2BodyDef,
            Body: Box2D.Dynamics.b2Body,
         	FixtureDef: Box2D.Dynamics.b2FixtureDef,
         	Fixture: Box2D.Dynamics.b2Fixture,
         	World: Box2D.Dynamics.b2World,
         	MassData: Box2D.Collision.Shapes.b2MassData,
         	PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
         	CircleShape: Box2D.Collision.Shapes.b2CircleShape,
         	DebugDraw: Box2D.Dynamics.b2DebugDraw,
			MouseJointDef: Box2D.Dynamics.Joints.b2MouseJointDef,
			PrismaticJointDef: Box2D.Dynamics.Joints.b2PrismaticJointDef,
			ContactListener: Box2D.Dynamics.b2ContactListener,
			FilterData: Box2D.Dynamics.b2FilterData
        }
    };

});