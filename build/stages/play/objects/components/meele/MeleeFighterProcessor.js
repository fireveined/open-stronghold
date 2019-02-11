"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionComp_1 = require("../PositionComp");
const ViewComp_1 = require("../renderable/ViewComp");
const StateComp_1 = require("../state/StateComp");
const MisslesColliderComp_1 = require("../misslesCollider/MisslesColliderComp");
const MeleeFigherComp_1 = require("./MeleeFigherComp");
const EventEmmiterComp_1 = require("../EventEmmiterComp");
const perform_ecs_1 = require("perform-ecs");
class MeleeFighterProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.AnimatedViewComp, PositionComp_1.PositionComp, MeleeFigherComp_1.MeleeFighterComp, StateComp_1.StateComp, EventEmmiterComp_1.EventEmmiterComp]
        });
        this.targets = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.AnimatedViewComp, PositionComp_1.PositionComp, MisslesColliderComp_1.MisslesColliderComp]
        });
    }
    update(delta) {
        const now = Date.now();
        for (const entity of this.view.entities) {
            if (now > entity.lastMeleeTargetSearchTime && !entity.meleeTarget) {
                entity.lastMeleeTargetSearchTime = now + 500;
                if (entity.canPush(entity.meleeFightPriority)) {
                    entity.meleeTarget = this._findTarget(entity);
                    if (entity.meleeTarget) {
                        this._attack(entity);
                    }
                }
            }
            else if (entity.meleeTarget) {
                entity.direction = PositionComp_1.getDirectionTowardsPointByAngle(entity, entity.meleeTarget.x, entity.meleeTarget.y);
                const distance = this._distance(entity, entity.meleeTarget);
                if (distance > entity.meleeRange) {
                    entity.meleeTarget = null;
                    entity.removeByType(this);
                }
            }
        }
    }
    _attack(entity) {
        if (!entity.meleeState) {
            let stateData;
            stateData = {
                type: this,
                priority: entity.meleeFightPriority,
                onPause: () => {
                    entity.remove(stateData);
                },
                onResume: () => {
                }
            };
            entity.meleeState = stateData;
            entity.push(stateData);
        }
        if (entity.animator.runIfNotRunning("melee_fight")) {
            entity.animator.events.on('frame', (frame) => {
                if (frame === entity.meleeHitFrame) {
                    const target = entity.meleeTarget;
                    target.events.emit("melee_attacked", entity.meleeDamage);
                    entity.events.emit("melee_attack");
                }
            });
            entity.animator.events.on("end", () => {
                entity.meleeTarget = this._findTarget(entity);
                if (entity.meleeTarget) {
                    this._attack(entity);
                }
                else {
                    entity.remove(entity.meleeState);
                    entity.meleeState = null;
                }
            });
        }
    }
    _distance(e1, e2) {
        return Math.sqrt((e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y));
    }
    _distancePoint(e1, x2, y2) {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }
    _findTarget(entity) {
        for (const target of this.targets.entities) {
            const distance = this._distance(entity, target);
            if (target !== entity && distance <= entity.meleeRange) {
                return target;
            }
        }
    }
}
exports.MeleeFighterProcessor = MeleeFighterProcessor;
