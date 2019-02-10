export interface Component {

}

export type Components = { [id: number]: Component };

export interface ComponentConstructor {
    new(...args: any[]): Component;
    id: number
};

export interface ComponentInitializator {
    constructor: ComponentConstructor;
    args?: any[];
}
