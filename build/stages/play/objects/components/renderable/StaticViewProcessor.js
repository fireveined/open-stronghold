"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const ViewComp_1 = require("./ViewComp");
const PositionComp_1 = require("../PositionComp");
class StaticViewProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.StaticViewComp, PositionComp_1.PositionComp]
        });
    }
    init(_positions) {
        this._positions = _positions;
    }
    update() {
        for (const entity of this.view.entities) {
            if (entity.oldX !== entity.x || entity.oldY !== entity.oldY) {
                //   this._positions.getTilePosition(entity.x, entity.y)
                entity.sprite.position.x = entity.x * this._positions.tileWidth;
                entity.sprite.position.y = entity.y * this._positions.tileHeight;
                entity.sprite.z = entity.y;
                entity.oldY = entity.y;
                entity.oldX = entity.x;
                entity.sprite.__height = 50;
            }
        }
    }
}
exports.StaticViewProcessor = StaticViewProcessor;
