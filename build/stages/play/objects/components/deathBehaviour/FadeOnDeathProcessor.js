"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const EventEmmiterComp_1 = require("../EventEmmiterComp");
const FadeOnDeathComp_1 = require("./FadeOnDeathComp");
const DamagableComp_1 = require("../damagable/DamagableComp");
class FadeOnDeathProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [FadeOnDeathComp_1.FadeOnDeathComp, EventEmmiterComp_1.EventEmmiterComp],
            onEntityAdded: this.onEntityAdded.bind(this)
        });
    }
    onEntityAdded(entity) {
        entity.events.on(DamagableComp_1.EntityDeathEvent, (promiseFunc, promise, type) => {
            let deathPromise;
            const animation = ["shot_death", "melee_death"][type];
            deathPromise = new Promise((resolve) => {
                if (entity.animator && entity.animator.hasAnimation(animation)) {
                    entity.animator.runAnimation(animation);
                    entity.animator.events.on("end", () => {
                        this._fadeOut(entity, resolve);
                    });
                }
                else {
                    this._fadeOut(entity, resolve);
                }
            });
            promiseFunc(deathPromise);
        });
    }
    _fadeOut(entity, onEnd) {
        const tween = PIXI.tweenManager.createTween(entity.sprite);
        tween.time = 2000;
        tween.from({ alpha: 1 });
        tween.to({ alpha: 0 });
        tween.delay = 1000;
        tween.start();
        tween.on("end", () => {
            tween.remove();
            onEnd();
        });
    }
    update(delta) {
    }
}
exports.FadeOnDeathProcessor = FadeOnDeathProcessor;
