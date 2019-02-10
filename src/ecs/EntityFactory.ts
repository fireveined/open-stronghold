import { ComponentsHash } from './ComponentsHash';
import { Entity } from './Entity';
import { EntityManager } from './EntityManager';
import { ComponentInitializator } from './Component';
import { runInThisContext } from 'vm';

export class EntityFactory<CreationFuncType extends (...args: any[]) => ComponentInitializator[]= any> {


    public componentHashs: ComponentsHash[];

    private _creationFunc: CreationFuncType;
    private _manager: EntityManager;


    constructor(manager: EntityManager, componentsInitFunc: CreationFuncType) {
        this._manager = manager;
        this._creationFunc = componentsInitFunc;
    }

    public onFirstUse: () => void | undefined;

    public create = (...args: any[]) => {
        if (this.onFirstUse) {
            this.onFirstUse();
            delete this.onFirstUse;
        }

        return this._manager.createEntityFromFactory(this.componentHashs, this._creationFunc(...args));
    }
}