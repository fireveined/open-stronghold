import { RegisterGroupFunction, System } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { Position, PositionComp } from '../PositionComp';
import { StaticView, StaticViewComp } from "../renderable/ViewComp";
import { ShootableComp, ShootableCompData } from "./ShootableComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../EventEmmiterComp";
import { MisslesColliderComp, MisslesColliderCoompData } from "../misslesCollider/MisslesColliderComp";
import { EntityDeathEvent, EntityDeathType } from "../damagable/DamagableComp";


export type ShootableEntity = Entity & StaticView & Position & ShootableCompData & EventEmmiterCompData;
export type TargetEntity = Entity & EventEmmiterCompData & MisslesColliderCoompData & Position;

export class ShootableProcessor implements System<ShootableEntity> {

    private _entities: ShootableEntity[];
    private _targets: TargetEntity[];


    public registerGroup(registerFunc: RegisterGroupFunction<ShootableEntity>) {
        this._entities = registerFunc([StaticViewComp, PositionComp, ShootableComp, EventEmmiterComp]);
        this._targets = registerFunc([EventEmmiterComp, MisslesColliderComp, PositionComp]) as any;
    }

    public update(delta: number) {
        const maxY = 50;
        const now = Date.now();
        for (const entity of this._entities) {
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
                this._onGroundHit(entity);
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

    private _onGroundHit(entity: ShootableEntity): void {
        for (const target of this._targets) {
            if (this._distance(entity, target.x, target.y) < entity.hitRadius) {
                target.events.emit("shoot", entity);
                entity.sprite.visible = false;
            }
        }
    }

    private _distance(e1: Position, x2: number, y2: number): number {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }
}
