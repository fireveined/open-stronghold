"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
let MeleeFighterComp = class MeleeFighterComp extends perform_ecs_1.Component {
    reset(obj, priority = 2) {
        obj.meleeFightPriority = priority;
        obj.meleeDamage = 5;
        obj.meleeRange = 2;
        obj.meleeHitFrame = 7;
        obj.lastMeleeTargetSearchTime = 0;
    }
};
MeleeFighterComp = __decorate([
    perform_ecs_1.makeComponent
], MeleeFighterComp);
exports.MeleeFighterComp = MeleeFighterComp;
