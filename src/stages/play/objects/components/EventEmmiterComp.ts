import { Component, makeComponent } from "perform-ecs"
import EventEmitter = PIXI.utils.EventEmitter;

@makeComponent
export class EventEmmiterComp extends Component{
    public events: EventEmitter;

    public reset(obj: EventEmmiterComp) {
        obj.events = new EventEmitter();
    }
}
