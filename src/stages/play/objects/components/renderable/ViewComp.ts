import { AnimationConfig, SpriteAnimator } from '../../../../../utils/spriteAnimator';
import { Component, makeComponent} from "perform-ecs"

@makeComponent
export class StaticViewComp extends Component {
    public sprite: PIXI.Sprite;
    public oldX: number;
    public oldY: number;

    public reset(obj: StaticViewComp, atlas: PIXI.loaders.Resource, frameName: string) {
        obj.sprite = new PIXI.Sprite(atlas.textures[frameName + ".png"]);
        obj.sprite.anchor.set(0.5, 1);
        obj.sprite.name = frameName;
    }

}

@makeComponent
export class AnimatedViewComp extends Component {
    sprite: PIXI.Sprite;
    animator: SpriteAnimator;

    public reset(obj: AnimatedViewComp, atlas: PIXI.loaders.Resource, animations: AnimationConfig[]) {
        obj.sprite = new PIXI.Sprite();
        obj.sprite.anchor.set(0.5, 0.65);
        obj.animator = new SpriteAnimator(atlas, animations);
        obj.animator.attachTo(this.sprite);
        obj.animator.runAnimation(animations[0].name);
    }
}

export interface AnyView {
    sprite: PIXI.Sprite
}

