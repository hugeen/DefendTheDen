define(function() {
Crafty.sprite(42, 	"img/wires-sprite.png", 		{ wires: 			[0, 0, 1, 10] });
    return [
        { type: "sprites", name: "wolf", size: 135, scenes: ["level"] },
        { type: "sprites", name: "pig", size: 115, scenes: ["level"] },
        {
            type: "sprites",
            name: "wires",
            size: 42,
            scenes: ["level"],
            maps: [{ name: "wires", coords: { x: 0, y: 0, w: 1, h: 10 }}]
        }
    ];
    
});