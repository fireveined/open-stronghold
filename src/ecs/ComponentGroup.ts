import { Component, ComponentConstructor } from './Component';
import { Entity } from './Entity';
import { ComponentsHash, getComponentsHash } from './ComponentsHash';
import * as EventEmmiter from "eventemitter3"

export class ComponentsGroup {
    public readonly entities: Entity[];
    public readonly hash: ComponentsHash;
    public readonly components: ComponentConstructor[];
    public onEntityAdded: ((entity: Entity) => void)[];
    public onEntityRemoved: ((entity: Entity) => void)[];

    constructor(components: ComponentConstructor[], hash: string) {
        this.hash = hash;
        this.entities = [];
        this.components = components;
        this.onEntityAdded = [];
        this.onEntityRemoved = [];
    }

    public pushEntity(entity: Entity): void {
        for (const callback of this.onEntityAdded) {
            callback(entity);
        }
        this.entities.push(entity);
    }

    public match(components: ComponentConstructor[]): boolean {
        for (const comp of this.components) {
            if (components.indexOf(comp) === -1) {
                return false;
            }
        }
        return true;
    }

    public has(component: ComponentConstructor): boolean {
        return this.components.indexOf(component) !== -1;
    }

    public removeEntity(entity: Entity): void {
        for (const callback of this.onEntityRemoved) {
            callback(entity);
        }

        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }
}

export type ComponentGroups = { [hash: string]: ComponentsGroup };