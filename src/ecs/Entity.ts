import { Component } from './Component';
import EventEmitter = PIXI.utils.EventEmitter;
export class Entity {
    public readonly id: number;
    [component: string]: any;

    constructor(id: number) {
        this.id = id;
    }
}

