import { Component, Entity, makeComponent } from "perform-ecs"
import { PositionComp } from "../PositionComp";

@makeComponent
export class ShootingComp extends Component {

    public shootTarget: Entity & PositionComp;
    public lastTargetSearchingTimestamp: number;
    public range: number;
    public shotPoint: PIXI.Point;
    public shotFrame: number;
    public shootingCompPriority: number;

    public reset(obj: ShootingComp, priority: number) {
        obj.shootingCompPriority = priority || 1;
        obj.range = 55;
        obj.lastTargetSearchingTimestamp = 0;
        obj.shotPoint = new PIXI.Point(0, -1);
        obj.shotFrame = 20;
    }

}

