import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';

export class StaticView implements AnyView {
    public sprite: PIXI.Sprite;
    public oldX: number;
    public oldY: number;

    constructor(atlas: PIXI.loaders.Resource, frameName: string) {
        this.sprite = new PIXI.Sprite(atlas.textures[frameName + ".png"]);
        this.sprite.anchor.set(0.5, 1);
        this.sprite.name = frameName;
    }

}

export class AnimatedView implements AnyView {
    sprite: PIXI.Sprite;
    animator: SpriteAnimator;

    constructor(atlas: PIXI.loaders.Resource, animations: AnimationConfig[]) {
        this.sprite = new PIXI.Sprite();
        this.sprite.anchor.set(0.5, 0.65);
        this.animator = new SpriteAnimator(atlas, animations);
        this.animator.attachTo(this.sprite);
        this.animator.runAnimation(animations[0].name);
    }
}

export interface AnyView {
    sprite: PIXI.Sprite
}

export const StaticViewComp = ecs.registerComponent(StaticView);
export const AnimatedViewComp = ecs.registerComponent(AnimatedView);