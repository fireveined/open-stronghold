import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position } from '../PositionComp';
import { ecs } from '../../../../../engine/ECS';
import { AnimatedView, AnimatedViewComp } from '../renderable/ViewComp';
import { Wanderer, WandererComp } from './WandererComp';
import { Walkable, WalkableComp } from '../walkable/WalkableComp';
import { IStateData, StateComp, StateCompData } from "../state/StateComp";

type WandererEnity = Entity & AnimatedView & Wanderer & Walkable & StateCompData;

export class WandererProcessor implements System<WandererEnity> {

    private _entities: WandererEnity[];

    public registerGroup(registerFunc: RegisterGroupFunction<WandererEnity>) {

        this._entities = registerFunc([WandererComp, AnimatedViewComp, WalkableComp, StateComp]);
    }

    public update() {
        const now = Date.now();
        for (const entity of this._entities) {

            if (now > entity.changeWanderingTimestamp) {
                entity.changeWanderingTimestamp = now + 2500 + Math.random() * 1000;

                if (entity.currentlyWandering) {
                    entity.currentlyWandering = false;
                    entity.targetX = entity.x;
                    entity.targetY = entity.y;
                    entity.removeByType(this);
                    continue;
                }

                if(entity.canPush(entity.wandererCompPriority)) {
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


