"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionComp_1 = require("../components/PositionComp");
const ViewComp_1 = require("../components/renderable/ViewComp");
function windAnimation(name) {
    return {
        name: "idle",
        textureName: (frameNumber) => `${name} (${frameNumber + 1}).png`,
        numFrames: 12,
        FPS: 8 + Math.round(Math.random() * 4),
        pingPong: true,
        loop: true
    };
}
;
function Plant(atlas, name) {
    return [
        { component: PositionComp_1.PositionComp },
        { component: ViewComp_1.AnimatedViewComp, args: [atlas, [windAnimation(name)]] }
    ];
}
exports.Plant = Plant;
