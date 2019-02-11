import {Component, makeComponent} from "perform-ecs"


@makeComponent
export class DefaultStateComp extends Component{

    public defaultAnimation: string;

    public reset(obj: DefaultStateComp, state: string) {
        obj.defaultAnimation = state;
    }
}
