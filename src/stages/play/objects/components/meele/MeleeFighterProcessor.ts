import { RegisterGroupFunction, System } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { getDirectionTowardsPointByAngle, Position, PositionComp } from '../PositionComp';
import { AnimatedView, AnimatedViewComp } from "../renderable/ViewComp";
import { IStateData, StateComp, StateCompData } from "../state/StateComp";
import { MisslesColliderComp } from "../misslesCollider/MisslesColliderComp";
import { MeleeFigherComp, MeleeFighterCompData } from "./MeleeFigherComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../EventEmmiterComp";

type MeeleFighterEntity =
    Entity
    & AnimatedView
    & Position
    & MeleeFighterCompData
    & StateCompData
    & EventEmmiterCompData;
type TargetEntity = Entity & AnimatedView & Position & EventEmmiterCompData;

export class MeleeFighterProcessor implements System<MeeleFighterEntity> {

    private _entities: MeeleFighterEntity[];
    private _targets: TargetEntity[];

    public registerGroup(registerFunc: RegisterGroupFunction<MeeleFighterEntity>) {
        this._entities = registerFunc([AnimatedViewComp, PositionComp, MeleeFigherComp, StateComp, EventEmmiterComp]);
        this._targets = registerFunc([AnimatedViewComp, PositionComp, MisslesColliderComp]);
    }

    public update(delta: number) {
        const now = Date.now();
        for (const entity of this._entities) {

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
                }
            }
        }
    }


    private _attack(entity: MeeleFighterEntity): void {

        if(!entity.meleeState) {
            let stateData: IStateData;
            stateData = {
                type: this,
                priority: entity.meleeFightPriority,
                onPause: () => {
                    entity.remove(stateData);
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
                    const target = entity.meleeTarget as TargetEntity;
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

    private _distance(e1: Position, e2: Position): number {
        return Math.sqrt((e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y));
    }

    private _distancePoint(e1: Position, x2: number, y2: number): number {
        return Math.sqrt((e1.x - x2) * (e1.x - x2) + (e1.y - y2) * (e1.y - y2));
    }

    private _findTarget(entity: MeeleFighterEntity): TargetEntity {
        for (const target of this._targets) {
            const distance = this._distance(entity, target);
            if (target !== entity && distance <= entity.meleeRange) {
                return target;
            }
        }
    }
}


