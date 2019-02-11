import {Component, Entity, makeComponent} from "perform-ecs"
import { PositionComp } from "../PositionComp";
import { IStateData } from "../state/StateComp";

@makeComponent
export class MeleeFighterComp extends Component{

    public meleeDamage: number;
    public meleeFightPriority: number;
    public meleeRange: number;
    public meleeHitFrame: number;
    public meleeTarget: Entity & PositionComp;
    public lastMeleeTargetSearchTime: number;
    public meleeState: IStateData;

    public reset(obj: MeleeFighterComp, priority: number = 2) {
        obj.meleeFightPriority = priority;
        obj.meleeDamage = 5;
        obj.meleeRange = 2;
        obj.meleeHitFrame = 7;
        obj.lastMeleeTargetSearchTime = 0;
    }
}

