import { ecs } from '../../../../engine/ECS';
import EventEmitter = PIXI.utils.EventEmitter;

export class EventEmmiterCompData {
    public events: EventEmitter;

    constructor() {
        this.events = new EventEmitter();
    }
}


export const EventEmmiterComp = ecs.registerComponent(EventEmmiterCompData);
