import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';

export class Wanderer {
    public changeWanderingTimestamp: number;
    public currentlyWandering: boolean;
    public wanderingDuration: number;
    public idleDuration: number;
    public wandererCompPriority: number;

    constructor(wanderingDuration: number, idleDuration: number, priority: number) {
        this.changeWanderingTimestamp = 0;
        this.wanderingDuration = wanderingDuration;
        this.idleDuration = idleDuration;
        this.wandererCompPriority = priority || 1;
    }

}


export const WandererComp = ecs.registerComponent(Wanderer);