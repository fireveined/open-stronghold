"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
let PositionComp = class PositionComp extends perform_ecs_1.Component {
    reset(obj) {
        obj.x = 0;
        obj.y = 0;
        obj.width = 20;
        obj.height = 20;
        obj.direction = 0;
    }
};
PositionComp = __decorate([
    perform_ecs_1.makeComponent
], PositionComp);
exports.PositionComp = PositionComp;
let dir = { '-1': {}, '0': {}, '1': {} };
dir[1][-1] = 0;
dir[1][0] = 1;
dir[1][1] = 2;
dir[0][1] = 3;
dir[-1][1] = 4;
dir[-1][0] = 5;
dir[-1][-1] = 6;
dir[0][-1] = 7;
function getDirectionTowardsPoint(entity, x, y) {
    const signX = Math.sign(x - entity.x);
    const signY = Math.sign(y - entity.y);
    return dir[signX][signY] !== undefined ? dir[signX][signY] : entity.direction;
}
exports.getDirectionTowardsPoint = getDirectionTowardsPoint;
function getDirectionTowardsPointByAngle(entity, x, y) {
    let angle = Math.atan2((y - entity.y) * 0.9, x - entity.x) * 180 / Math.PI + 45 + 23;
    if (angle < 0) {
        angle += 360;
    }
    return Math.floor(angle / 45);
}
exports.getDirectionTowardsPointByAngle = getDirectionTowardsPointByAngle;
