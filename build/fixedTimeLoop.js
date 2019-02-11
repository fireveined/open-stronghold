"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ECS_1 = require("./engine/ECS");
class FixedTimeLoop {
    constructor(config) {
        this._functions = [];
        this.prevUpdateTimestamp = Date.now();
        this.frameTime = 1000 / config.targetFPS;
        this.intervalHandler = setInterval(this.update.bind(this), 10);
        this.callback = config.callback;
    }
    add(func, bind) {
        this._functions.push({ func, bind });
    }
    update() {
        let delta = Date.now() - this.prevUpdateTimestamp;
        PIXI.tweenManager.update(delta / 1000);
        while (delta > this.frameTime) {
            this.callback(this.frameTime);
            this._functions.forEach(obj => obj.func.call(obj.bind, this.frameTime));
            delta -= this.frameTime;
            this.prevUpdateTimestamp += this.frameTime;
            ECS_1.ecs.update(this.frameTime);
        }
    }
}
exports.FixedTimeLoop = FixedTimeLoop;
