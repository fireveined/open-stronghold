"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const PositionComp_1 = require("../PositionComp");
const ViewComp_1 = require("../renderable/ViewComp");
const ShootableComp_1 = require("./ShootableComp");
const EventEmmiterComp_1 = require("../EventEmmiterComp");
const MisslesColliderComp_1 = require("../misslesCollider/MisslesColliderComp");
const DamagableComp_1 = require("../damagable/DamagableComp");
class ShootableProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [ViewComp_1.StaticViewComp, PositionComp_1.PositionComp, ShootableComp_1.ShootableComp, EventEmmiterComp_1.EventEmmiterComp]
        });
        this.targets = perform_ecs_1.EntityViewFactory.createView({
            components: [EventEmmiterComp_1.EventEmmiterComp, MisslesColliderComp_1.MisslesColliderComp, PositionComp_1.PositionComp]
        });
    }
    update(delta) {
        const maxY = 50;
        const now = Date.now();
        for (const entity of this.view.entities) {
            if (entity.hitTheGround) {
                continue;
            }
            entity.sprite.anchor.set(0.5, 0.5);
            const distance = this._distance(entity, entity.targetX, entity.targetY);
            const height = Math.min(-(distance / entity.wholeDistance - 0.7), 0) * maxY;
            if (Math.abs(entity.targetX - entity.x) < 0.4 && Math.abs(entity.targetY - entity.y) < 0.4) {
                entity.sprite.texture.frame = new PIXI.Rectangle(0, 15, entity.sprite.texture.width, 24);
                entity.sprite.texture._updateUvs();
                entity.hitTheGround = true;
                entity.events.emitAsync(DamagableComp_1.EntityDeathEvent, DamagableComp_1.EntityDeathType.OTHER);
                this._onGroundHit(this.view.entities[0]);
                continue;
            }
            const angle = Math.atan2((entity.targetY - entity.y), entity.targetX - entity.x);
            entity.sprite.rotation = angle + Math.PI / 2;
            entity.sprite.scale.y = Math.min(1.3 - Math.abs(height / 100), 1);
            entity.x += entity.speed * Math.cos(angle) * delta / 1000;
            entity.y += entity.speed * Math.sin(angle) * delta / 1000 - entity.yVel * delta / 1000;
            const angle2 = Math.atan2((entity.y - entity.oldY), entity.x - entity.oldX);
            entity.sprite.rotation = angle2 + Math.PI / 2;
            entity.yVel -= 30 * delta / 1000;
        }
    }
    _onGroundHit(entity) {
        this.view.entities[0] = entity;
        for (const target of this.targets.entities) {
            if (this._distance(entity, target.x, target.y) < entity.hitRadius) {
                target.events.emit("shoot", entity);
                entity.sprite.visible = false;
            }
        }
    }
    _distance(e1, x2, y2) {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }
}
exports.ShootableProcessor = ShootableProcessor;
