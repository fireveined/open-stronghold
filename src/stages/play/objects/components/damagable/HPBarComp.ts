import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';
import Sprite = PIXI.Sprite;

export class HPBar {

    public hpBarSprite: Sprite;
    public hpBarSpriteFrame: Sprite;

    constructor() {
        this.hpBarSprite = new PIXI.Sprite((<any>PIXI).TextureCache["hp_bar.png"]);
        this.hpBarSprite.anchor.set(0, 0.5);
        this.hpBarSprite.name = "HPBar";

        this.hpBarSpriteFrame = new PIXI.Sprite((<any>PIXI).TextureCache["hp_bar_frame.png"]);
        this.hpBarSpriteFrame.anchor.set(0, 0.5);
        this.hpBarSpriteFrame.name = "HPBarFrame";
    }

}


export const HPBarComp = ecs.registerComponent(HPBar);