import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { AnimatedView, AnimatedViewComp } from '../renderable/ViewComp';
import { Wanderer, WandererComp } from '../wanderer/WandererComp';
import { Walkable, WalkableComp } from '../walkable/WalkableComp';
import { IStateData, StateComp, StateCompData } from "../state/StateComp";
import { DefaultStateComp } from "../state/DefaultStateComp";
import { MisslesColliderComp, MisslesColliderCoompData } from "./MisslesColliderComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../EventEmmiterComp";
import { EntityDeathEvent, EntityDeathType } from "../damagable/DamagableComp";
import { ComponentConstructor } from "../../../../../ecs/Component";

type MisslesColliderEntity = Entity & MisslesColliderCoompData & EventEmmiterCompData;

export class MisslesColliderProcessor implements System<MisslesColliderEntity> {

    private _entities: MisslesColliderEntity[];
    public removeComponentFromEntity: (entity: Entity, component: ComponentConstructor) => void;

    public registerGroup(registerFunc: RegisterGroupFunction<MisslesColliderEntity>) {
        this._entities = registerFunc([MisslesColliderComp, EventEmmiterComp]);
    }

    public onEntityAdded(entity: MisslesColliderEntity): void {
        entity.events.on(EntityDeathEvent, () => {
            this.removeComponentFromEntity(entity, MisslesColliderComp);
        })
    }

    public update(): void {
    }
}


