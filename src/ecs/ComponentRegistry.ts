import { ComponentConstructor } from "./Component";

export class ComponentRegistry {

    private _id: number;
    constructor() {

        this._id = 0;
    }

    public register(component: any): ComponentConstructor {
        const id = this._id++;
        return class Component extends component {
            static id: number = id;
        }
    }
}