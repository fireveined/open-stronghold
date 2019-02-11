import { AnimatedViewComp } from './ViewComp';
import { PositionComp } from '../PositionComp';
import { TileViewPlacementStrategy } from "../../../map/tiles/TileViewPlacementStrategy";
import { EntityViewFactory, System } from "perform-ecs"


export class AnimatedViewProcessor extends System {

    private _positions: TileViewPlacementStrategy;

    public view = EntityViewFactory.createView({
        components: [AnimatedViewComp, PositionComp]
    })

    public init(_positions: TileViewPlacementStrategy): void {
        this._positions = _positions;
    }

    public update(delta: number) {
        for (const entity of this.view.entities) {

            if (entity.oldX !== entity.x || entity.oldY !== entity.y) {

                entity.sprite.x = entity.x * this._positions.tileWidth;
                entity.sprite.y = entity.y * this._positions.tileHeight;
                (<any>entity.sprite).z = entity.y;
                (<any>entity.sprite).__height = 50;
                entity.oldY = entity.y;
                entity.oldX = entity.x;
            }

            entity.animator.update(delta);
            entity.animator.direction = entity.direction;
        }
    }
}


