import { AnimatedViewComp } from '../renderable/ViewComp';
import { DamagableComp, EntityDeathEvent } from "./DamagableComp";
import { HPBarComp } from "./HPBarComp";
import { EntityViewFactory, System, SystemEntityType } from "perform-ecs"


export class HPBarProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [DamagableComp, HPBarComp, AnimatedViewComp],
        onEntityAdded: this.onEntityAdded.bind(this)
    })


    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        setTimeout(() => {
            entity.sprite.addChild(entity.hpBarSprite);
            entity.sprite.addChild(entity.hpBarSpriteFrame);
            const y = -entity.sprite.texture.trim.height * entity.sprite.anchor.y - entity.hpBarSprite.height - 10;
            entity.hpBarSprite.y = y;
            entity.hpBarSpriteFrame.y = y;
            entity.hpBarSpriteFrame.x = -entity.hpBarSpriteFrame.width / 2;
            entity.hpBarSprite.x = entity.hpBarSpriteFrame.x + 1;
        }, 0);  

        entity.events.on(EntityDeathEvent, () => {
            entity.hpBarSprite.visible = false;
            entity.hpBarSpriteFrame.visible = false;
        })
    }


    public update(delta: number) {
        let hpPercent: number;
        for (const entity of this.view.entities) {
            hpPercent = entity.currentHP / entity.maxHP;
            entity.hpBarSprite.scale.x = hpPercent;
            const r = 1 - hpPercent
            const g = hpPercent;
            const b = 0;

            entity.hpBarSprite.tint = PIXI.utils.rgb2hex([r, g, b]);
        }
    }
}