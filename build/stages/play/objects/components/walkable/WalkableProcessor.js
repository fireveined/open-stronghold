"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const PositionComp_1 = require("../PositionComp");
const ViewComp_1 = require("../renderable/ViewComp");
const WalkableComp_1 = require("./WalkableComp");
class WalkableProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [WalkableComp_1.WalkableComp, ViewComp_1.AnimatedViewComp, PositionComp_1.PositionComp],
            onEntityAdded: this.onEntityAdded.bind(this)
        });
    }
    onEntityAdded(entity) {
        entity.targetX = entity.x;
        entity.targetY = entity.y;
    }
    update(delta) {
        for (const entity of this.view.entities) {
            const signX = Math.sign(entity.targetX - entity.x);
            const signY = Math.sign(entity.targetY - entity.y);
            entity.x += signX * entity.speed * delta / 1000;
            entity.y += signY * entity.speed * delta / 1000;
            entity.direction = PositionComp_1.getDirectionTowardsPoint(entity, entity.targetX, entity.targetY);
            if (Math.abs(entity.targetX - entity.x) < 15) {
                entity.targetX = entity.x;
            }
            if (Math.abs(entity.targetY - entity.y) < 15) {
                entity.targetY = entity.y;
            }
        }
    }
}
exports.WalkableProcessor = WalkableProcessor;
