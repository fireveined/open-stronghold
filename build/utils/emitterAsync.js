"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmmiter = PIXI.utils.EventEmitter;
EventEmmiter.prototype.emitAsync = function (type, ...args) {
    let resolveFunc;
    let promise = new Promise(resolve => {
        resolveFunc = resolve;
    });
    const promises = [];
    this.emit(type, (promise) => {
        promises.push(promise);
    }, promise, ...args);
    Promise.all(promises).then(resolveFunc);
    return promise;
};
