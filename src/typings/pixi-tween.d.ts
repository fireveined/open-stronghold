// Type definitions for pixi-tween
// Project: https://github.com/themoonrat/pixi-tween

interface on {
    end?: Function;
    pingpong?: Function;
    repeat?: Function;
    start?: Function;
    stop?: Function;
    update?: Function;
}



declare namespace tween {
    interface tweenConfig {
        from?: object;
        to?: object;
        delay?: number;
        easing?: Function;
        expire?: boolean;
        loop?: boolean;
        path?: object;
        pathReverse?: boolean;
        pingPong?: boolean;
        repeat?: number;
        time?: number;
        on?: on;
        speed?: number;
    }

    class Tween {
        constructor(target: object, manager?: tween.TweenManager, config?: tween.tweenConfig);
        readonly active: boolean;
        delay: number;
        easing: tween.Easing;
        readonly elapsedTime: number;
        expire: boolean;
        readonly isEnded: boolean;
        readonly isStarted: boolean;
        loop: boolean;
        pathReverse: boolean;
        pingPong: boolean;
        repeat: number;
        time: number;
        progress: number;
        speed: number;
        addTo(manager: tween.TweenManager): tween.Tween;
        chain(tween: tween.Tween): tween.Tween;
        clear(): tween.Tween;
        config(config: tween.tweenConfig): any;
        from(data?: object): tween.Tween;
        remove(): tween.Tween;
        reset(): tween.Tween;
        start(resolve?: Promise<any>): tween.Tween;
        startPromise(): Promise<any>;
        stop(end?: boolean): tween.Tween;
        to(data: object): tween.Tween;
        update(deltaMS: number): any;
        once(event: "start" | "end" | "repeat" | "update" | "stop" | "pingpong", fn: Function, context?: any): any;
        on(event: "start" | "end" | "repeat" | "update" | "stop" | "pingpong", fn: Function, context?: any): any;
        off(event: "start" | "end" | "repeat" | "update" | "stop" | "pingpong", fn: Function, context?: any, once?: boolean): any;
    }

    interface Easing {
        inBack(v?: number): Function;
        inBounce(): Function;
        inCirc(): Function;
        inCubic(): Function;
        inElastic(a?: number, p?: number): Function;
        inExpo(): Function;
        inOutBack(v?: number): Function;
        inOutBounce(): Function;
        inOutCirc(): Function;
        inOutCubic(): Function;
        inOutElastic(a?: number, p?: number): Function;
        inOutExpo(): Function;
        inOutQuad(): Function;
        inOutQuart(): Function;
        inOutQuint(): Function;
        inOutSine(): Function;
        inQuad(): Function;
        inQuart(): Function;
        inQuint(): Function;
        inSine(): Function;
        linear(): Function;
        outBack(v?: number): Function;
        outBounce(): Function;
        outCirc(): Function;
        outCubic(): Function;
        outElastic(a?: number, p?: number): Function;
        outExpo(): Function;
        outQuad(): Function;
        outQuart(): Function;
        outQuint(): Function;
        outSine(): Function;
    }

    class TweenManager {
        constructor();
        tweens: Array<tween.Tween>;
        addTween(tween: tween.Tween): any;
        createTween(target: object, config?: tween.tweenConfig): tween.Tween;
        getTweensForTarget(target: object): Array<tween.Tween>;
        removeTween(tween: tween.Tween): any;
        update(deltaMS: number): any;
    }

}
declare namespace PIXI {
    var tweenManager: tween.TweenManager;
}

declare module "pixi-tween" {
    export = PIXI.tweenManager;
}
