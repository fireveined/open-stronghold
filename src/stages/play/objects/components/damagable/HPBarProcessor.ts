import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position, getDirectionTowardsPoint } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { AnimatedView, AnimatedViewComp, AnyView } from '../renderable/ViewComp';
import { Direction } from '../../../world/Direction';
import { Damagable, DamagableComp, EntityDeathEvent } from "./DamagableComp";
import { IStateData, StateComp, StateCompData } from "../state/StateComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../EventEmmiterComp";
import { ShootableEntity } from "../shooting/ShootableProcessor";
import { HPBar, HPBarComp } from "./HPBarComp";
import { MisslesColliderComp } from "../misslesCollider/MisslesColliderComp";
import { ComponentConstructor } from "../../../../../ecs/Component";

type HPBarEntity = Entity & Damagable & AnimatedView & HPBar;


export class HPBarProcessor implements System<HPBarEntity> {

    private _entities: HPBarEntity[];

    public registerGroup(registerFunc: RegisterGroupFunction<HPBarEntity>) {
        this._entities = registerFunc([DamagableComp, HPBarComp, AnimatedViewComp]);
    }

    public onEntityAdded(entity: HPBarEntity): void {
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
        for (const entity of this._entities) {
            hpPercent = entity.currentHP / entity.maxHP;
            entity.hpBarSprite.scale.x = hpPercent;
            const r = 1 - hpPercent
            const g = hpPercent;
            const b = 0;

            entity.hpBarSprite.tint = PIXI.utils.rgb2hex([r, g, b]);
        }
    }
}