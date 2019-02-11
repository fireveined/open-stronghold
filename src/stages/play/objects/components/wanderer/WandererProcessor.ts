import { EntityViewFactory, System } from "perform-ecs"
import { AnimatedViewComp } from '../renderable/ViewComp';
import { WandererComp } from './WandererComp';
import { WalkableComp } from '../walkable/WalkableComp';
import { IStateData, StateComp } from "../state/StateComp";

export class WandererProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [WandererComp, AnimatedViewComp, WalkableComp, StateComp]
    })


    public update() {
        const now = Date.now();
        for (const entity of this.view.entities) {

            if (now > entity.changeWanderingTimestamp) {
                entity.changeWanderingTimestamp = now + 2500 + Math.random() * 1000;

                if (entity.currentlyWandering) {
                    entity.currentlyWandering = false;
                    entity.targetX = entity.x;
                    entity.targetY = entity.y;
                    entity.removeByType(this);
                    continue;
                }

                if (entity.canPush(entity.wandererCompPriority)) {
                    let stateData: IStateData;
                    stateData = {
                        type: this,
                        priority: entity.wandererCompPriority,
                        onPause: () => {
                            entity.remove(stateData);
                            entity.currentlyWandering = false;
                            entity.targetX = entity.x;
                            entity.targetY = entity.y;
                            entity.changeWanderingTimestamp = now + 2500 + Math.random() * 1000;
                        },
                        onResume: () => {
                        }
                    }

                    entity.push(stateData);
                    entity.currentlyWandering = true;
                    entity.animator.runAnimation("walk");
                    entity.targetX = entity.x + Math.random() * 1000 - 500;
                    entity.targetY = entity.y + Math.random() * 1000 - 500;
                }
            }
        }
    }

}


