"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ViewComp_1 = require("../renderable/ViewComp");
const DamagableComp_1 = require("./DamagableComp");
const HPBarComp_1 = require("./HPBarComp");
const perform_ecs_1 = require("perform-ecs");
class HPBarProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [DamagableComp_1.DamagableComp, HPBarComp_1.HPBarComp, ViewComp_1.AnimatedViewComp],
            onEntityAdded: this.onEntityAdded.bind(this)
        });
    }
    onEntityAdded(entity) {
        setTimeout(() => {
            entity.sprite.addChild(entity.hpBarSprite);
            entity.sprite.addChild(entity.hpBarSpriteFrame);
            const y = -entity.sprite.texture.trim.height * entity.sprite.anchor.y - entity.hpBarSprite.height - 10;
            entity.hpBarSprite.y = y;
            entity.hpBarSpriteFrame.y = y;
            entity.hpBarSpriteFrame.x = -entity.hpBarSpriteFrame.width / 2;
            entity.hpBarSprite.x = entity.hpBarSpriteFrame.x + 1;
        }, 0);
        entity.events.on(DamagableComp_1.EntityDeathEvent, () => {
            entity.hpBarSprite.visible = false;
            entity.hpBarSpriteFrame.visible = false;
        });
    }
    update(delta) {
        let hpPercent;
        for (const entity of this.view.entities) {
            hpPercent = entity.currentHP / entity.maxHP;
            entity.hpBarSprite.scale.x = hpPercent;
            const r = 1 - hpPercent;
            const g = hpPercent;
            const b = 0;
            entity.hpBarSprite.tint = PIXI.utils.rgb2hex([r, g, b]);
        }
    }
}
exports.HPBarProcessor = HPBarProcessor;
