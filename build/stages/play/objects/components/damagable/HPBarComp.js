"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
let HPBarComp = class HPBarComp extends perform_ecs_1.Component {
    reset(obj) {
        obj.hpBarSprite = new PIXI.Sprite(PIXI.TextureCache["hp_bar.png"]);
        obj.hpBarSprite.anchor.set(0, 0.5);
        obj.hpBarSprite.name = "HPBar";
        obj.hpBarSpriteFrame = new PIXI.Sprite(PIXI.TextureCache["hp_bar_frame.png"]);
        obj.hpBarSpriteFrame.anchor.set(0, 0.5);
        obj.hpBarSpriteFrame.name = "HPBarFrame";
    }
};
HPBarComp = __decorate([
    perform_ecs_1.makeComponent
], HPBarComp);
exports.HPBarComp = HPBarComp;
