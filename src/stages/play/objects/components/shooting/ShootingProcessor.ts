import { EntityViewFactory, System, SystemEntityType, EntityOf } from "perform-ecs"
import { getDirectionTowardsPointByAngle, PositionComp } from '../PositionComp';
import { AnimatedViewComp } from "../renderable/ViewComp";
import { ShootingComp } from "./ShootingComp";
import { IStateData, StateComp } from "../state/StateComp";
import { MisslesColliderComp } from "../misslesCollider/MisslesColliderComp";
import { ShootableComp } from "./ShootableComp";

export class ShootingProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [AnimatedViewComp, PositionComp, ShootingComp, StateComp]
    })


    public targets = EntityViewFactory.createView({
        components: [AnimatedViewComp, PositionComp, MisslesColliderComp]
    })

    private _arrowFactory: () => EntityOf<PositionComp & ShootableComp>;

    public init(arrowFactory: () => EntityOf<PositionComp & ShootableComp>): void {
        this._arrowFactory = arrowFactory;
    }


    public update(delta: number) {
        const now = Date.now();
        for (const entity of this.view.entities) {

            if (now > entity.lastTargetSearchingTimestamp && !entity.shootTarget) {
                entity.lastTargetSearchingTimestamp = now + 500;
                if (entity.canPush(entity.shootingCompPriority)) {
                    entity.shootTarget = this._findTarget(entity);
                    if (entity.shootTarget) {
                        this._shoot(entity);
                    }
                }
            } else if (entity.shootTarget) {
                entity.direction = getDirectionTowardsPointByAngle(entity, entity.shootTarget.x, entity.shootTarget.y)
                const distance = this._distance(entity, entity.shootTarget);
                if (distance > entity.range) {
                    entity.shootTarget = null;
                    entity.removeByType(this);
                }
            }
        }
    }


    private _shoot(entity: SystemEntityType<this, "view">): void {
        let stateData: IStateData;
        stateData = {
            type: this,
            priority: entity.shootingCompPriority,
            onPause: () => {
                entity.remove(stateData);
                entity.shootTarget = null;
            },
            onResume: () => {
            }
        }
        entity.push(stateData);
        entity.animator.runAnimation("shot");

        entity.animator.events.on('frame', (frame: number) => {
            if (frame === entity.shotFrame) {
                const arrow = this._arrowFactory();
                arrow.x = arrow.startY = entity.x + entity.shotPoint.x;
                arrow.y = entity.y + entity.shotPoint.y;
                arrow.targetX = entity.shootTarget.x + Math.random() * 2 - 1;
                arrow.targetY = entity.shootTarget.y + Math.random() * 2 - 1;
                arrow.wholeDistance = this._distancePoint(arrow, arrow.targetX, arrow.targetY);
                arrow.yVel = Math.pow((arrow.wholeDistance / arrow.speed) / 2 * 250, 0.75);
            }
        });

        entity.animator.events.on("end", () => {
            entity.remove(stateData);
            entity.shootTarget = null;
        })
    }

    private _distance(e1: EntityOf<PositionComp>, e2: EntityOf<PositionComp>): number {
        return Math.sqrt((e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y));
    }

    private _distancePoint(e1: EntityOf<PositionComp>, x2: number, y2: number): number {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }

    private _findTarget(entity: SystemEntityType<this, "view">): SystemEntityType<this, "targets"> {
        let foundTarget: SystemEntityType<this, "targets"> ;

        let minDistance: number = 999999;
        for (let target of this.targets.entities) {
            const distance = this._distance(entity, target);
            foundTarget = this.targets.entities[0];
            this.targets.entities[9] = foundTarget;
            target = foundTarget;
            if (target !== entity && distance <= entity.range && distance < minDistance) {
                minDistance = distance;
                foundTarget = target;
            }
        }
        return foundTarget;
    }
}


