"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const animationRuner_1 = require("./animationRuner");
class SpriteAnimator {
    constructor(atlas, animations) {
        this._direction = 0;
        this.animations = this.attachFramesTextures(atlas, animations);
        this.runner = new animationRuner_1.AnimationRuner();
    }
    attachTo(sprite) {
        this.sprite = sprite;
        let firstAnimation = this.animations[Object.keys(this.animations)[0]];
        this.runner.run(firstAnimation);
        this.runner.stop();
    }
    get events() {
        return this.runner.events;
    }
    runIfNotRunning(name) {
        if (this.runner.getCurrentAnimation().config.name !== name || this.runner.isStopped()) {
            this.runAnimation(name);
            return true;
        }
    }
    runAnimation(name) {
        let anim = this.animations[name];
        if (!anim) {
            console.error(`Can't find animation ${name}`);
            return;
        }
        this.runner.run(anim);
    }
    hasAnimation(name) {
        return this.animations[name] !== undefined;
    }
    update(delta) {
        this.runner.update(delta);
        let frame = this.runner.getCurrentFrame(this.runner.getCurrentAnimation().config.allDirections ? this._direction : 0);
        if (this.sprite && this.sprite.texture != frame) {
            this.sprite.texture = frame;
        }
    }
    stop() {
        this.runner.stop();
    }
    resume() {
        this.runner.resume();
    }
    set direction(direction) {
        this._direction = direction;
    }
    attachFramesTextures(atlas, configs) {
        let animations = {};
        for (let config of configs) {
            let animation = {
                config,
                frames: this.generateFrames(atlas, config)
            };
            animations[config.name] = animation;
        }
        return animations;
    }
    generateFrames(resource, config) {
        let directions = [];
        let atlas = resource.textures;
        if (atlas === undefined) {
            logger_1.logger.error("Can't load textures from " + resource.name);
            return;
        }
        const directionsNum = config.allDirections ? 8 : 1;
        for (let direction = 0; direction < directionsNum; direction++) {
            directions.push([]);
            for (let i = 0; i < config.numFrames; i++) {
                let frameName = config.textureName(i, direction);
                let frame = atlas[frameName];
                if (!frame) {
                    logger_1.logger.error("Can't find frame " + frameName, atlas);
                }
                directions[direction].push(frame);
            }
        }
        return directions;
    }
}
exports.SpriteAnimator = SpriteAnimator;
