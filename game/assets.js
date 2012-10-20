define(function() {

    return [
        { type: "sprites", name: "wolf", size: 135, scenes: ["level"] },
        { type: "sprites", name: "pig", size: 115, scenes: ["level"] },
        { type: "sprites", name: "wagon", size: 81, scenes: ["level"] },
        {
            type: "sprites",
            name: "wires",
            size: 42,
            scenes: ["level"],
            maps: [{ name: "wires", coords: { x: 0, y: 0, w: 1, h: 10 }}]
        }
    ];
    
});