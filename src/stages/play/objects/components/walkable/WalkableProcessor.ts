import { EntityViewFactory, System, SystemEntityType } from "perform-ecs"
import { getDirectionTowardsPoint, PositionComp } from '../PositionComp';
import { AnimatedViewComp } from '../renderable/ViewComp';
import { WalkableComp } from './WalkableComp';

export class WalkableProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [WalkableComp, AnimatedViewComp, PositionComp],
        onEntityAdded: this.onEntityAdded.bind(this)
    })


    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        entity.targetX = entity.x;
        entity.targetY = entity.y;
    }


    public update(delta: number) {

        for (const entity of this.view.entities) {
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