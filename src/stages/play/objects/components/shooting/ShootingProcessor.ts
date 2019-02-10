import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position, getDirectionTowardsPoint, getDirectionTowardsPointByAngle } from '../PositionComp';
import { AnimatedView, AnimatedViewComp } from "../renderable/ViewComp";
import { ShootingComp, ShootingCompData } from "./ShootingComp";
import { IStateData, StateComp, StateCompData } from "../state/StateComp";
import { ShootableEntity } from "./ShootableProcessor";
import { MisslesColliderComp } from "../misslesCollider/MisslesColliderComp";

type ShootingEntity = Entity & AnimatedView & Position & ShootingCompData & StateCompData;
type TargetEntity = Entity & AnimatedView & Position;

export class ShootingProcessor implements System<ShootingEntity> {

    private _entities: ShootingEntity[];
    private _targets: TargetEntity[];

    private _arrowFactory: () => ShootableEntity;

    public init(arrowFactory: () => ShootableEntity): void {
        this._arrowFactory = arrowFactory;
    }


    public registerGroup(registerFunc: RegisterGroupFunction<ShootingEntity>) {
        this._entities = registerFunc([AnimatedViewComp, PositionComp, ShootingComp, StateComp]);
        this._targets = registerFunc([AnimatedViewComp, PositionComp, MisslesColliderComp]);
    }

    public update(delta: number) {
        const now = Date.now();
        for (const entity of this._entities) {

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


    private _shoot(entity: ShootingEntity): void {
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

    private _distance(e1: Position, e2: Position): number {
        return Math.sqrt((e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y));
    }

    private _distancePoint(e1: Position, x2: number, y2: number): number {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }

    private _findTarget(entity: ShootingEntity): TargetEntity {
        let foundTarget: TargetEntity;
        let minDistance: number = 999999;
        for (const target of this._targets) {
            const distance = this._distance(entity, target);
            if (target !== entity && distance <= entity.range && distance < minDistance) {
                minDistance = distance;
                foundTarget = target;
            }
        }
        return foundTarget;
    }
}


