"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
let DamagableComp = class DamagableComp extends perform_ecs_1.Component {
    reset(obj) {
        obj.maxHP = obj.currentHP = 30;
        obj.isDead = false;
    }
};
DamagableComp = __decorate([
    perform_ecs_1.makeComponent
], DamagableComp);
exports.DamagableComp = DamagableComp;
var EntityDeathType;
(function (EntityDeathType) {
    EntityDeathType[EntityDeathType["SHOT"] = 0] = "SHOT";
    EntityDeathType[EntityDeathType["MEELE"] = 1] = "MEELE";
    EntityDeathType[EntityDeathType["OTHER"] = 2] = "OTHER";
})(EntityDeathType = exports.EntityDeathType || (exports.EntityDeathType = {}));
exports.EntityDeathEvent = "death";
