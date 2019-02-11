"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const PositionComp_1 = require("../PositionComp");
const ViewComp_1 = require("../renderable/ViewComp");
const ShootingComp_1 = require("./ShootingComp");
const StateComp_1 = require("../state/StateComp");
const MisslesColliderComp_1 = require("../misslesCollider/MisslesColliderComp");
class ShootingProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.AnimatedViewComp, PositionComp_1.PositionComp, ShootingComp_1.ShootingComp, StateComp_1.StateComp]
        });
        this.targets = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.AnimatedViewComp, PositionComp_1.PositionComp, MisslesColliderComp_1.MisslesColliderComp]
        });
    }
    init(arrowFactory) {
        this._arrowFactory = arrowFactory;
    }
    update(delta) {
        const now = Date.now();
        for (const entity of this.view.entities) {
            if (now > entity.lastTargetSearchingTimestamp && !entity.shootTarget) {
                entity.lastTargetSearchingTimestamp = now + 500;
                if (entity.canPush(entity.shootingCompPriority)) {
                    entity.shootTarget = this._findTarget(entity);
                    if (entity.shootTarget) {
                        this._shoot(entity);
                    }
                }
            }
            else if (entity.shootTarget) {
                entity.direction = PositionComp_1.getDirectionTowardsPointByAngle(entity, entity.shootTarget.x, entity.shootTarget.y);
                const distance = this._distance(entity, entity.shootTarget);
                if (distance > entity.range) {
                    entity.shootTarget = null;
                    entity.removeByType(this);
                }
            }
        }
    }
    _shoot(entity) {
        let stateData;
        stateData = {
            type: this,
            priority: entity.shootingCompPriority,
            onPause: () => {
                entity.remove(stateData);
                entity.shootTarget = null;
            },
            onResume: () => {
            }
        };
        entity.push(stateData);
        entity.animator.runAnimation("shot");
        entity.animator.events.on('frame', (frame) => {
            if (frame === entity.shotFrame) {
                const arrow = this._arrowFactory();
                arrow.x = arrow.startY = entity.x + entity.shotPoint.x;
                arrow.y = entity.y + entity.shotPoint.y;
                arrow.targetX = entity.shootTarget.x + Math.random() * 2 - 1;
                arrow.targetY = entity.shootTarget.y + Math.random() * 2 - 1;
                arrow.wholeDistance = this._distancePoint(arrow, arrow.targetX, arrow.targetY);
                arrow.yVel = Math.pow((arrow.wholeDistance / arrow.speed) / 2 * 250, 0.75);
            }
        });
        entity.animator.events.on("end", () => {
            entity.remove(stateData);
            entity.shootTarget = null;
        });
    }
    _distance(e1, e2) {
        return Math.sqrt((e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y));
    }
    _distancePoint(e1, x2, y2) {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }
    _findTarget(entity) {
        let foundTarget;
        let minDistance = 999999;
        for (let target of this.targets.entities) {
            const distance = this._distance(entity, target);
            foundTarget = this.targets.entities[0];
            this.targets.entities[9] = foundTarget;
            target = foundTarget;
            if (target !== entity && distance <= entity.range && distance < minDistance) {
                minDistance = distance;
                foundTarget = target;
            }
        }
        return foundTarget;
    }
}
exports.ShootingProcessor = ShootingProcessor;
