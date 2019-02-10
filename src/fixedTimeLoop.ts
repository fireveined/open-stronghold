import { ecs } from './engine/ECS';
import TweenManager = tween.TweenManager;

declare type FixedTimeLoopCallback = (delta: number) => void;

interface FixedTimeLoopConfig {
    callback: FixedTimeLoopCallback;
    targetFPS: number;
}

export class FixedTimeLoop {
    private intervalHandler: any;
    private frameTime: number;
    private prevUpdateTimestamp: number;
    private callback: FixedTimeLoopCallback;

    private _functions: { func: (delta: number) => void, bind: any }[] = [];

    constructor(config: FixedTimeLoopConfig) {
        this.prevUpdateTimestamp = Date.now();
        this.frameTime = 1000 / config.targetFPS;
        this.intervalHandler = setInterval(this.update.bind(this), 10);
        this.callback = config.callback;
    }

    public add(func: (delta: number) => void, bind?: any) {
        this._functions.push({func, bind});
    }

    private update() {
        let delta = Date.now() - this.prevUpdateTimestamp;
        PIXI.tweenManager.update(delta/1000);
        while (delta > this.frameTime) {
            this.callback(this.frameTime);

            this._functions.forEach(obj => obj.func.call(obj.bind, this.frameTime))
            delta -= this.frameTime;
            this.prevUpdateTimestamp += this.frameTime;
            ecs.update(this.frameTime);
        }
    }
}