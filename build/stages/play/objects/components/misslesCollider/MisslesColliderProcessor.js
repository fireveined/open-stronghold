"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const EventEmmiterComp_1 = require("../EventEmmiterComp");
const DamagableComp_1 = require("../damagable/DamagableComp");
const MisslesColliderComp_1 = require("./MisslesColliderComp");
class MisslesColliderProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [MisslesColliderComp_1.MisslesColliderComp, EventEmmiterComp_1.EventEmmiterComp]
        });
    }
    onEntityAdded(entity) {
        entity.events.on(DamagableComp_1.EntityDeathEvent, () => {
            this.ecs.removeComponentsFromEntity(entity, MisslesColliderComp_1.MisslesColliderComp);
        });
    }
    update() {
    }
}
exports.MisslesColliderProcessor = MisslesColliderProcessor;
