import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';
import Sprite = PIXI.Sprite;

export class FadeOnDeathCompData {

    constructor() {

    }
}


export const FadeOnDeathComp = ecs.registerComponent(FadeOnDeathCompData);