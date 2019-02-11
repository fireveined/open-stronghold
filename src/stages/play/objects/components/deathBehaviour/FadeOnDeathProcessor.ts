import { EntityViewFactory, System, SystemEntityType } from "perform-ecs"
import { EventEmmiterComp } from "../EventEmmiterComp";
import { FadeOnDeathComp } from "./FadeOnDeathComp";
import { EntityDeathEvent, EntityDeathType } from "../damagable/DamagableComp";
import { AsyncEmitterFunc } from "../../../../../utils/emitterAsync";


export class FadeOnDeathProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [FadeOnDeathComp, EventEmmiterComp],
        onEntityAdded: this.onEntityAdded.bind(this)
    })


    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
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

    private _fadeOut(entity: SystemEntityType<this, "view">, onEnd: Function): void {
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