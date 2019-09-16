import { EntityViewFactory, System, SystemEntityType } from "perform-ecs"
import { EntityDeathEvent } from "../damagable/DamagableComp";
import { PositionComp } from "../PositionComp";
import { MapColliderComp } from "./MapColliderComp";
import { CollisionMap } from "../../../map/CollisionMap";

export class MapColliderSystem extends System {

    public view = EntityViewFactory.createView({
        components: [MapColliderComp, PositionComp],
        onEntityAdded: this.onEntityAdded.bind(this)
    })

    private _collisionMap: CollisionMap;

    public init(map: CollisionMap): void{
        this._collisionMap = map;
    }

    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        this._collisionMap.markAsUsed(entity.x, entity.y, entity.collidingFields);
    }

    public update(): void {
    }
}


