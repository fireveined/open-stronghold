"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ViewComp_1 = require("./ViewComp");
const PositionComp_1 = require("../PositionComp");
const perform_ecs_1 = require("perform-ecs");
class AnimatedViewProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.AnimatedViewComp, PositionComp_1.PositionComp]
        });
    }
    init(_positions) {
        this._positions = _positions;
    }
    update(delta) {
        for (const entity of this.view.entities) {
            if (entity.oldX !== entity.x || entity.oldY !== entity.y) {
                entity.sprite.x = entity.x * this._positions.tileWidth;
                entity.sprite.y = entity.y * this._positions.tileHeight;
                entity.sprite.z = entity.y;
                entity.sprite.__height = 50;
                entity.oldY = entity.y;
                entity.oldX = entity.x;
            }
            entity.animator.update(delta);
            entity.animator.direction = entity.direction;
        }
    }
}
exports.AnimatedViewProcessor = AnimatedViewProcessor;
