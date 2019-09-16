import { Component, makeComponent } from "perform-ecs"
import { IPoint } from "../../../map/CollisionMap";

@makeComponent
export class MapColliderComp extends Component {

    public collidingFields: IPoint[];

    public reset(obj: MapColliderComp, collidingFields: IPoint[]): void {
        obj.collidingFields = collidingFields;
    }
}

