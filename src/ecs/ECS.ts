import { EntityManager } from './EntityManager';
import { SystemFactory, System, SystemConstuctor } from './SystemFactory';
import { ComponentRegistry } from './ComponentRegistry';
import { ComponentConstructor, ComponentInitializator } from './Component';
import { EntityFactory } from './EntityFactory';
export class ECS {

    private _manager: EntityManager;
    private _systemFactory: SystemFactory;
    private _componentRegistry: ComponentRegistry;
    private _systems: System[];

    constructor() {
        this._manager = new EntityManager();
        this._systemFactory = new SystemFactory(this._manager);
        this._componentRegistry = new ComponentRegistry();
        this._systems = [];
    }

    public createSystem(systemConstructor: SystemConstuctor): any {
        const system = this._systemFactory.create(systemConstructor);
        this._systems.push(system);
        return system;
    }

    public registerComponent(component: any): ComponentConstructor {
        return this._componentRegistry.register(component);
    }

    public createEntityFactory<FuncType extends (...args: any[]) => any>(componentInit: FuncType): EntityFactory {
        return this._manager.createEntityFactory<FuncType>(componentInit);
    }

    public update(delta: number): void {
        for (const system of this._systems) {
            system.update(delta);
        }
    }
}