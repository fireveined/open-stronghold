import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';
import { Entity } from "../../../../../ecs";
import { Position } from "../PositionComp";

export class ShootingCompData {

    public shootTarget: Entity & Position;
    public lastTargetSearchingTimestamp: number;
    public range: number;
    public shotPoint: PIXI.Point;
    public shotFrame: number;
    public shootingCompPriority: number;
    constructor(priority: number) {
        this.shootingCompPriority = priority || 1;
        this.range = 55;
        this.lastTargetSearchingTimestamp = 0;
        this.shotPoint = new PIXI.Point(0, -1);
        this.shotFrame = 20;
    }

}

export const ShootingComp = ecs.registerComponent(ShootingCompData);
