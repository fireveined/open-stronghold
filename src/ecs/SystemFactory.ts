import { EntityManager } from "./EntityManager";
import { Entity } from './Entity';
import { ComponentConstructor } from './Component';

export type RegisterGroupFunction<EntityType extends Entity = Entity> = (components: ComponentConstructor[]) => EntityType[];

export interface System<EntityType extends Entity = Entity> {
    removeComponentFromEntity?: (entity: Entity, component: ComponentConstructor) => void;
    registerGroup: (components: RegisterGroupFunction<EntityType>) => void;
    onEntityAdded?: (entity: EntityType) => void;
    update: (delta?: number) => void;
}

export interface SystemConstuctor {
    new(): System<any>;
}

export class SystemFactory {

    private _manager: EntityManager;

    constructor(manager: EntityManager) {
        this._manager = manager;
    }

    public create<T extends System>(systemCtr: new () => T): typeof system {
        const system = new systemCtr();
        system.removeComponentFromEntity = this._manager.removeComponent.bind(this._manager);
        system.registerGroup((components) => {
            const group = this._manager.createGroup(components);
            if (system.onEntityAdded) {
                group.onEntityAdded.push(system.onEntityAdded.bind(system));
            }
            return group.entities;
        });
        return system;
    }
}