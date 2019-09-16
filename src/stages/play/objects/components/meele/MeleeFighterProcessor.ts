import { getDirectionTowardsPointByAngle, PositionComp } from '../PositionComp';
import { AnimatedViewComp } from "../renderable/ViewComp";
import { IStateData, StateComp } from "../state/StateComp";
import { MisslesColliderComp } from "../misslesCollider/MisslesColliderComp";
import { MeleeFighterComp } from "./MeleeFigherComp";
import { EventEmmiterComp } from "../EventEmmiterComp";
import { EntityOf, EntityViewFactory, System, SystemEntityType } from "perform-ecs"


export class MeleeFighterProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [AnimatedViewComp, PositionComp, MeleeFighterComp, StateComp, EventEmmiterComp]
    })

    public targets = EntityViewFactory.createView({
        components: [AnimatedViewComp, PositionComp, MisslesColliderComp]
    })


    public update(delta: number) {
        const now = Date.now();
        for (const entity of this.view.entities) {

            if (now > entity.lastMeleeTargetSearchTime && !entity.meleeTarget) {
                entity.lastMeleeTargetSearchTime = now + 500;
                if (entity.canPush(entity.meleeFightPriority)) {
                    entity.meleeTarget = this._findTarget(entity);
                    if (entity.meleeTarget) {
                        this._attack(entity);
                    }
                }
            } else if (entity.meleeTarget) {
                entity.direction = getDirectionTowardsPointByAngle(entity, entity.meleeTarget.x, entity.meleeTarget.y)
                const distance = this._distance(entity, entity.meleeTarget);
                if (distance > entity.meleeRange) {
                    entity.meleeTarget = null;
                    entity.removeByType(this);
                    entity.meleeState = null;
                }
            }
        }
    }


    private _attack(entity: SystemEntityType<this, "view">): void {

        if (!entity.meleeState) {
            let stateData: IStateData;
            stateData = {
                type: this,
                priority: entity.meleeFightPriority,
                onPause: () => {
                    entity.remove(stateData);
                    entity.meleeState = null;
                    entity.meleeTarget = null;
                },
                onResume: () => {
                }
            }
            entity.meleeState = stateData;
            entity.push(stateData);
        }

        if (entity.animator.runIfNotRunning("melee_fight")) {

            entity.animator.events.on('frame', (frame: number) => {
                if (frame === entity.meleeHitFrame) {
                    const target = entity.meleeTarget;
                    target.events.emit("melee_attacked", entity.meleeDamage);
                    entity.events.emit("melee_attack");
                }
            });

            entity.animator.events.on("end", () => {
                entity.meleeTarget = this._findTarget(entity);
                if (entity.meleeTarget) {
                    this._attack(entity);
                } else {
                    entity.remove(entity.meleeState);
                    entity.meleeState = null;
                }
            })
        }
    }

    private _distance(e1: EntityOf<PositionComp>, e2: EntityOf<PositionComp>): number {
        return Math.sqrt((e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y));
    }

    private _distancePoint(e1: EntityOf<PositionComp>, x2: number, y2: number): number {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }

    private _findTarget(entity: SystemEntityType<this, "view">): SystemEntityType<this, "targets"> {
        for (const target of this.targets.entities) {
            const distance = this._distance(entity, target);
            if (target !== entity && distance <= entity.meleeRange) {
                return target;
            }
        }
    }
}


