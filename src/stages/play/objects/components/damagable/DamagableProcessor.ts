import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position, getDirectionTowardsPoint } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { AnimatedView, AnimatedViewComp, AnyView } from '../renderable/ViewComp';
import { Direction } from '../../../world/Direction';
import { Damagable, DamagableComp, EntityDeathEvent, EntityDeathType } from "./DamagableComp";
import { IStateData, StateComp, StateCompData } from "../state/StateComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../EventEmmiterComp";
import { ShootableEntity } from "../shooting/ShootableProcessor";
import { ComponentConstructor } from "../../../../../ecs/Component";


type DamagableEntity = Entity & Damagable & StateCompData & EventEmmiterCompData & AnimatedView;


export class DamagableProcessor implements System<DamagableEntity> {

    private _entities: DamagableEntity[];


    public registerGroup(registerFunc: RegisterGroupFunction<DamagableEntity>) {
        this._entities = registerFunc([DamagableComp, StateComp, EventEmmiterComp, AnimatedViewComp]);
    }

    public onEntityAdded(entity: DamagableEntity): void {
        entity.events.on("shoot", (missle: ShootableEntity) => {
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
                entity.events.emitAsync(EntityDeathEvent, EntityDeathType.SHOT);
            }
        })

        entity.events.on("melee_attacked", (dmg: number) => {
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
                entity.events.emitAsync(EntityDeathEvent, EntityDeathType.MEELE);
            }
        })
    }


    public update(delta: number) {
        // for (const entity of this._entities) {
        //     if (entity.currentHP <= 0 && !entity.isDead) {
        //         entity.isDead = true;
        //     }
        // }
    }
}