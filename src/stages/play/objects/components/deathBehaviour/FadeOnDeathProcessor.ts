import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position, getDirectionTowardsPoint } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { AnimatedView, AnimatedViewComp, AnyView } from '../renderable/ViewComp';
import { Direction } from '../../../world/Direction';
import { IStateData, StateComp, StateCompData } from "../state/StateComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../EventEmmiterComp";
import { ShootableEntity } from "../shooting/ShootableProcessor";
import { FadeOnDeathComp } from "./FadeOnDeathComp";
import { EntityDeathEvent, EntityDeathType } from "../damagable/DamagableComp";
import { AsyncEmitterFunc } from "../../../../../utils/emitterAsync";

type FadeOnDeathEntity = Entity & EventEmmiterCompData & AnimatedView;


export class FadeOnDeathProcessor implements System<FadeOnDeathEntity> {

    private _entities: FadeOnDeathEntity[];

    public registerGroup(registerFunc: RegisterGroupFunction<FadeOnDeathEntity>) {
        this._entities = registerFunc([FadeOnDeathComp, EventEmmiterComp]);
    }

    public onEntityAdded(entity: FadeOnDeathEntity): void {
        entity.events.on(EntityDeathEvent, (promiseFunc: AsyncEmitterFunc, promise: Promise<any>, type: EntityDeathType) => {
            let deathPromise: Promise<any>;

            const animation = ["shot_death", "melee_death"][type];
            deathPromise = new Promise((resolve) => {
                if (entity.animator && entity.animator.hasAnimation(animation)) {
                    entity.animator.runAnimation(animation);
                    entity.animator.events.on("end", () => {
                        this._fadeOut(entity, resolve);
                    })
                } else {
                    this._fadeOut(entity, resolve);
                }
            });

            promiseFunc(deathPromise);
        })
    }

    private _fadeOut(entity: FadeOnDeathEntity, onEnd: Function): void {
        const tween = PIXI.tweenManager.createTween(entity.sprite);
        tween.time = 2000;
        tween.from({alpha: 1});
        tween.to({alpha: 0});
        tween.delay = 1000;
        tween.start();
        tween.on("end", () => {
            tween.remove();
            onEnd();
        })
    }

    public update(delta: number) {
    }
}