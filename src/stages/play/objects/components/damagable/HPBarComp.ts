import { Component, makeComponent } from "perform-ecs"
import Sprite = PIXI.Sprite;

@makeComponent
export class HPBarComp extends Component {

    public hpBarSprite: Sprite;
    public hpBarSpriteFrame: Sprite;

    public reset(obj: HPBarComp) {
        obj.hpBarSprite = new PIXI.Sprite((<any>PIXI).TextureCache["hp_bar.png"]);
        obj.hpBarSprite.anchor.set(0, 0.5);
        obj.hpBarSprite.name = "HPBar";

        obj.hpBarSpriteFrame = new PIXI.Sprite((<any>PIXI).TextureCache["hp_bar_frame.png"]);
        obj.hpBarSpriteFrame.anchor.set(0, 0.5);
        obj.hpBarSpriteFrame.name = "HPBarFrame";
    }

}
