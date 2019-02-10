import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';

export class Walkable {
    public targetX: number;
    public targetY: number;
    public speed: number;

    constructor() {
        this.targetX = 0;
        this.targetY = 0;
        this.speed = 2;
    }

}


export const WalkableComp = ecs.registerComponent(Walkable);