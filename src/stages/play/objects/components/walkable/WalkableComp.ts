import { Component, makeComponent } from "perform-ecs"

@makeComponent
export class WalkableComp extends Component{
    public targetX: number;
    public targetY: number;
    public speed: number;

    public reset(obj: WalkableComp) {
        obj.targetX = 0;
        obj.targetY = 0;
        obj.speed = 2;
    }

}


