import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { StaticViewComp, StaticView } from './ViewComp';
import { PositionComp, Position } from '../PositionComp';
import { TileViewPlacementStrategy } from "../../../map/tiles/TileViewPlacementStrategy";

type StaticViewEntity = Entity & StaticView & Position;

export class StaticViewProcessor implements System<StaticViewEntity> {

    private _positions: TileViewPlacementStrategy;
    private _entities: StaticViewEntity[];

    public init(_positions: TileViewPlacementStrategy): void {
        this._positions = _positions;
    }

    public registerGroup(registerFunc: RegisterGroupFunction<StaticViewEntity>) {
        this._entities = registerFunc([StaticViewComp, PositionComp]);
    }

    public update() {
        for (const entity of this._entities) {
            if (entity.oldX !== entity.x || entity.oldY !== entity.oldY) {

                //   this._positions.getTilePosition(entity.x, entity.y)
                entity.sprite.position.x = entity.x * this._positions.tileWidth;
                entity.sprite.position.y = entity.y * this._positions.tileHeight;
                (<any>entity.sprite).z = entity.y ;
                entity.oldY = entity.y;
                entity.oldX = entity.x;
                (<any>entity.sprite).__height = 50;
            }
        }
    }
}


