import { utils } from "pixi.js";
import EventEmmiter = PIXI.utils.EventEmitter;

declare module "pixi.js" {
    namespace utils {
        interface EventEmitter {
            emitAsync(type: string, ...args: any[]): Promise<any>;
        }
    }
}

EventEmmiter.prototype.emitAsync = function (type: string, ...args: any[]): Promise<any> {
    let resolveFunc: () => void;
    let promise = new Promise(resolve => {
        resolveFunc = resolve;
    })
    const promises = <Promise<any>[]>[];
    this.emit(type, (promise: Promise<any>) => {
        promises.push(promise)
    }, promise, ...args);
    Promise.all(promises).then(resolveFunc);
    return promise;
}

export type AsyncEmitterFunc = (promise: Promise<any>) => void;