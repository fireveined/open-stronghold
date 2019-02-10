import { ecs } from '../../../../../engine/ECS';
import { Entity } from "../../../../../ecs";
import { Position } from "../PositionComp";
import { IStateData } from "../state/StateComp";

export class MeleeFighterCompData {

    public meleeDamage: number;
    public meleeFightPriority: number;
    public meleeRange: number;
    public meleeHitFrame: number;
    public meleeTarget: Entity & Position;
    public lastMeleeTargetSearchTime: number;
    public meleeState: IStateData;

    constructor(priority: number = 2) {
        this.meleeFightPriority = priority;
        this.meleeDamage = 5;
        this.meleeRange = 2;
        this.meleeHitFrame = 7;
        this.lastMeleeTargetSearchTime = 0;
    }

}

export const MeleeFigherComp = ecs.registerComponent(MeleeFighterCompData);
