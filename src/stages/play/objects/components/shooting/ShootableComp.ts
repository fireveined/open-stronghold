import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';
import { Entity } from "../../../../../ecs";
import { Position } from "../PositionComp";

export class ShootableCompData {

    public startY: number;
    public targetX: number;
    public targetY: number;
    public speed: number = 35;
    public yHeight: number;
    public yVel: number = 0;
    public hitTheGround: boolean;
    public wholeDistance: number;
    public hitRadius: number = 1;
    public hitDamage: number = 8;

    constructor() {
        this.yHeight = 0;
    }

}

export const ShootableComp = ecs.registerComponent(ShootableCompData);
