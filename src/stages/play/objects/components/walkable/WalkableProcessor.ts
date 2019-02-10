import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position, getDirectionTowardsPoint } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { AnimatedView, AnimatedViewComp } from '../renderable/ViewComp';
import { Walkable, WalkableComp } from './WalkableComp';
import { Direction } from '../../../world/Direction';

type WalkableEntity = Entity & AnimatedView & Walkable & Position;



export class WalkableProcessor implements System<WalkableEntity> {

    private _entities: WalkableEntity[];

    public registerGroup(registerFunc: RegisterGroupFunction<WalkableEntity>) {
        this._entities = registerFunc([WalkableComp, AnimatedViewComp, PositionComp]);
    }

    public onEntityAdded(entity: WalkableEntity): void {
        entity.targetX = entity.x;
        entity.targetY = entity.y;
    }


    public update(delta: number) {
        for (const entity of this._entities) {
            const signX = Math.sign(entity.targetX - entity.x);
            const signY = Math.sign(entity.targetY - entity.y);

            entity.x += signX * entity.speed * delta / 1000;
            entity.y += signY * entity.speed * delta / 1000;
            entity.direction = getDirectionTowardsPoint(entity, entity.targetX, entity.targetY);


            if (Math.abs(entity.targetX - entity.x) < 15) {
                entity.targetX = entity.x;
            }

            if (Math.abs(entity.targetY - entity.y) < 15) {
                entity.targetY = entity.y;
            }
        }
    }
}