import { Component, makeComponent } from "perform-ecs"

@makeComponent
export class WandererComp extends Component {
    public changeWanderingTimestamp: number;
    public currentlyWandering: boolean;
    public wanderingDuration: number;
    public idleDuration: number;
    public wandererCompPriority: number;

    public reset(obj: WandererComp, wanderingDuration: number, idleDuration: number, priority: number) {
        obj.changeWanderingTimestamp = 0;
        obj.wanderingDuration = wanderingDuration;
        obj.idleDuration = idleDuration;
        obj.wandererCompPriority = priority || 1;
    }
}


