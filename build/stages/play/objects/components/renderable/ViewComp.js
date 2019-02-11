"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const spriteAnimator_1 = require("../../../../../utils/spriteAnimator");
const perform_ecs_1 = require("perform-ecs");
let StaticViewComp = class StaticViewComp extends perform_ecs_1.Component {
    reset(obj, atlas, frameName) {
        obj.sprite = new PIXI.Sprite(atlas.textures[frameName + ".png"]);
        obj.sprite.anchor.set(0.5, 1);
        obj.sprite.name = frameName;
    }
};
StaticViewComp = __decorate([
    perform_ecs_1.makeComponent
], StaticViewComp);
exports.StaticViewComp = StaticViewComp;
let AnimatedViewComp = class AnimatedViewComp extends perform_ecs_1.Component {
    reset(obj, atlas, animations) {
        obj.sprite = new PIXI.Sprite();
        obj.sprite.anchor.set(0.5, 0.65);
        obj.animator = new spriteAnimator_1.SpriteAnimator(atlas, animations);
        obj.animator.attachTo(this.sprite);
        obj.animator.runAnimation(animations[0].name);
    }
};
AnimatedViewComp = __decorate([
    perform_ecs_1.makeComponent
], AnimatedViewComp);
exports.AnimatedViewComp = AnimatedViewComp;
