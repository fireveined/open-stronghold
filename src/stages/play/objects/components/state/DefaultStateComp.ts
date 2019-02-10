import { ecs } from '../../../../../engine/ECS';


export class DefaultStateCompData {

    public defaultAnimation: string;

    constructor(state: string) {
        this.defaultAnimation = state;
    }
}


export const DefaultStateComp = ecs.registerComponent(DefaultStateCompData);