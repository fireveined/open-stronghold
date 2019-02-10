import { Entity } from './Entity';
import { Component, ComponentConstructor, ComponentInitializator } from './Component';
import { ComponentGroups, ComponentsGroup } from './ComponentGroup';
import { ComponentsHash, getComponentsHash } from './ComponentsHash';
import { EntityFactory } from './EntityFactory';

export class EntityManager {
    private _id: number;

    private _entityFactories: EntityFactory[];
    private _components: Component[];
    private _groups: ComponentGroups;

    constructor() {
        this._id = 0;
        this._entityFactories = [];
        this._groups = {};
    }

    public createEntityFromFactory(hashes: ComponentsHash[], initializators: ComponentInitializator[]): Entity {
        const entity = this._createEntity();

        for (const comp of initializators) {
            const created = this._createComponent(comp);
            Object.assign(entity, created);
        }

        for (const hash of hashes) {
            this._groups[hash].pushEntity(entity);
        }

        if (entity.events) {
            entity.events.on("death", (promiseFunc: Function, promise: Promise<any>) => {
                promise.then(() => {
                    this.removeEntity(entity, hashes);
                })
            });
        }

        return entity;
    }

    public removeEntity(entity: Entity, components: ComponentsHash[]): void {
        for (const hash of components) {
            this._groups[hash].removeEntity(entity);
        }
        console.log("removed entity from " + components.length + " groups", entity,)
    }

    public removeComponent(entity: Entity, component: ComponentConstructor): void {
        for (const key in this._groups) {
            if (this._groups[key].has(component)) {
                this._groups[key].removeEntity(entity);
            }
        }
    }

    private _getMatchingGroupsHashes(components: ComponentConstructor[]): ComponentsHash[] {
        const hashes: ComponentsHash[] = [];

        for (const key in this._groups) {
            if (this._groups[key].match(components)) {
                hashes.push(this._groups[key].hash);
            }
        }

        return hashes;
    }

    public _createEntity(): Entity {
        return new Entity(this._id++);
    }

    private _createComponent(componentInit: ComponentInitializator) {
        return new componentInit.constructor(...componentInit.args);
    }

    // public createEntityFactory2(componentsInit: ComponentInitializator[]): EntityFactory {
    //     const factory = new EntityFactory(this, componentsInit);

    //     factory.onFirstUse = () => {
    //         const constructors = componentsInit.map(comp => comp.constructor);
    //         factory.componentHashs = this._getMatchingGroupsHashes(constructors)
    //     }

    //     this._entityFactories.push(factory);
    //     return factory;
    // }

    public createEntityFactory<FuncType extends (...args: any[]) => ComponentInitializator[]>(componentsInitFunc: FuncType): EntityFactory {
        const componentsInit = componentsInitFunc();
        const factory = new EntityFactory<FuncType>(this, componentsInitFunc);

        factory.onFirstUse = () => {
            const constructors = componentsInit.map(comp => comp.constructor);
            factory.componentHashs = this._getMatchingGroupsHashes(constructors)
        }

        this._entityFactories.push(factory);
        return factory;
    }

    /*
    public addSystemGroupToEntityFactories(): void {
        for (const factory of this._entityFactories) {
            const constructors = factory.initializators.map(comp => comp.constructor);
            factory.componentHashs = this._getMatchingGroupsHashes(constructors)
        }
    }
    */

    public getEntitiesByHash(hash: ComponentsHash): Entity[] {
        return this._groups[hash].entities;
    }

    public createGroup(components: ComponentConstructor[]): ComponentsGroup {
        const hash = getComponentsHash(components);
        if (!this._groups[hash]) {
            this._groups[hash] = new ComponentsGroup(components, hash);
        }
        return this._groups[hash];
    }
}
