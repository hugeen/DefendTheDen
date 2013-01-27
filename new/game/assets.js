define(function() {

    return [{
        type: "images",
        name: "github",
        scenes: ["level"]
    }, {
        type: "sprites",
        name: "wolf",
        size: 135,
        scenes: ["level"]
    }, {
        type: "sprites",
        name: "pig",
        size: 115,
        scenes: ["level"]
    }, {
        type: "sprites",
        name: "octocat",
        size: 90,
        scenes: ["level"]
    }, {
        type: "sprites",
        name: "wagon",
        size: 81,
        scenes: ["level"]
    }, {
        type: "sprites",
        name: "axe",
        size: 42,
        scenes: ["level"]
    }, {
        type: "sprites",
        name: "fork",
        size: 34,
        scenes: ["level"],
        maps: [{
            name: "fork",
            coords: { x: 0, y: 0, w: 3, h: 1 }
        }]
    }, {
        type: "sprites",
        name: "wires",
        size: 42,
        scenes: ["level"],
        maps: [{
            name: "wires",
            coords: { x: 0, y: 0, w: 1, h: 10 }
        }]
    }];

});
