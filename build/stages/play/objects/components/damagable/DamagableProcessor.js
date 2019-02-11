"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const ViewComp_1 = require("../renderable/ViewComp");
const DamagableComp_1 = require("./DamagableComp");
const StateComp_1 = require("../state/StateComp");
const EventEmmiterComp_1 = require("../EventEmmiterComp");
class DamagableProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.entities = perform_ecs_1.EntityViewFactory.createView({
            components: [DamagableComp_1.DamagableComp, StateComp_1.StateComp, EventEmmiterComp_1.EventEmmiterComp, ViewComp_1.AnimatedViewComp],
            onEntityAdded: this.onEntityAdded.bind(this)
        });
    }
    onEntityAdded(entity) {
        entity.events.on("shoot", (missle) => {
            entity.currentHP -= missle.hitDamage;
            if (entity.currentHP <= 0) {
                entity.push({
                    priority: 9999,
                    type: this,
                    onPause: () => {
                    },
                    onResume: () => {
                    }
                });
                entity.isDead = true;
                entity.events.emitAsync(DamagableComp_1.EntityDeathEvent, DamagableComp_1.EntityDeathType.SHOT);
            }
        });
        entity.events.on("melee_attacked", (dmg) => {
            entity.currentHP -= dmg;
            if (entity.currentHP <= 0) {
                entity.push({
                    priority: 9999,
                    type: this,
                    onPause: () => {
                    },
                    onResume: () => {
                    }
                });
                entity.isDead = true;
                entity.events.emitAsync(DamagableComp_1.EntityDeathEvent, DamagableComp_1.EntityDeathType.MEELE);
            }
        });
    }
    update(delta) {
    }
}
exports.DamagableProcessor = DamagableProcessor;
