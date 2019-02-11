import { EntityOf, EntityViewFactory, System, SystemEntityType } from "perform-ecs"
import { PositionComp } from '../PositionComp';
import { StaticViewComp } from "../renderable/ViewComp";
import { ShootableComp } from "./ShootableComp";
import { EventEmmiterComp } from "../EventEmmiterComp";
import { MisslesColliderComp, } from "../misslesCollider/MisslesColliderComp";
import { EntityDeathEvent, EntityDeathType } from "../damagable/DamagableComp";


export class ShootableProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [StaticViewComp, PositionComp, ShootableComp, EventEmmiterComp]
    })

    public targets = EntityViewFactory.createView({
        components: [EventEmmiterComp, MisslesColliderComp, PositionComp]
    })


    public update(delta: number) {
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
                entity.sprite.texture.frame = new PIXI.Rectangle(0, 15, entity.sprite.texture.width, 24)
                entity.sprite.texture._updateUvs();
                entity.hitTheGround = true;
                entity.events.emitAsync(EntityDeathEvent, EntityDeathType.OTHER);
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

    private _onGroundHit(entity: SystemEntityType<this, "view">): void {
        this.view.entities[0] = entity;
        for (const target of this.targets.entities) {
            if (this._distance(entity, target.x, target.y) < entity.hitRadius) {
                target.events.emit("shoot", entity);
                entity.sprite.visible = false;
            }
        }
    }

    private _distance(e1: EntityOf<PositionComp>, x2: number, y2: number): number {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }
}