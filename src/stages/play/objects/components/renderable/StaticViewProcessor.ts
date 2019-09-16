import { EntityViewFactory, System } from "perform-ecs"
import { StaticViewComp } from './ViewComp';
import { PositionComp } from '../PositionComp';
import { TileViewPlacementStrategy } from "../../../map/tiles/TileViewPlacementStrategy";

export class StaticViewProcessor extends System {

    private _positions: TileViewPlacementStrategy;

    public view = EntityViewFactory.createView({
        components: [StaticViewComp, PositionComp]
    })

    public init(_positions: TileViewPlacementStrategy): void {
        this._positions = _positions;
    }


    public update() {
        for (const entity of this.view.entities) {
            if (entity.oldX !== entity.x || entity.oldY !== entity.oldY) {

                this._positions.getTilePosition(entity.x, entity.y)
                entity.sprite.position.x = this._positions.x
                entity.sprite.position.y = this._positions.y;
                (<any>entity.sprite).z = entity.y;
                entity.oldY = entity.y;
                entity.oldX = entity.x;
                (<any>entity.sprite).__height = 50;
            }
        }
    }
}


