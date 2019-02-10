import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { AnimatedView, AnimatedViewComp } from './ViewComp';
import { PositionComp, Position } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { TileViewPlacementStrategy } from "../../../map/tiles/TileViewPlacementStrategy";

type AnimatedViewEntity = Entity & AnimatedView & Position;

export class AnimatedViewProcessor implements System<AnimatedViewEntity> {

    private _positions: TileViewPlacementStrategy;
    private _entities: AnimatedViewEntity[];

    public init(_positions: TileViewPlacementStrategy): void {
        this._positions = _positions;
    }

    public registerGroup(registerFunc: RegisterGroupFunction<AnimatedViewEntity>) {
        this._entities = registerFunc([AnimatedViewComp, PositionComp]);
    }

    public update(delta: number) {
        for (const entity of this._entities) {

            if (entity.oldX !== entity.x || entity.oldY !== entity.y) {

                //   this._positions.getTilePosition(entity.x, entity.y)
                entity.sprite.x = entity.x * this._positions.tileWidth;
                entity.sprite.y = entity.y * this._positions.tileHeight;
                (<any>entity.sprite).z = entity.y ;
                (<any>entity.sprite).__height = 50;
                entity.oldY = entity.y;
                entity.oldX = entity.x;
            }

            entity.animator.update(delta);
            entity.animator.direction = entity.direction;
        }
    }
}


