"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionComp_1 = require("../components/PositionComp");
const ViewComp_1 = require("../components/renderable/ViewComp");
const ShootableComp_1 = require("../components/shooting/ShootableComp");
const EventEmmiterComp_1 = require("../components/EventEmmiterComp");
const FadeOnDeathComp_1 = require("../components/deathBehaviour/FadeOnDeathComp");
function Arrow(atlas, name) {
    return [
        { component: EventEmmiterComp_1.EventEmmiterComp },
        { component: PositionComp_1.PositionComp },
        { component: ViewComp_1.StaticViewComp, args: [atlas, "arrow"] },
        { component: ShootableComp_1.ShootableComp },
        { component: FadeOnDeathComp_1.FadeOnDeathComp }
    ];
}
exports.Arrow = Arrow;
