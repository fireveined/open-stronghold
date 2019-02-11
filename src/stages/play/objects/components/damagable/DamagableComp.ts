import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import {Component, makeComponent} from "perform-ecs"

@makeComponent
export class DamagableComp extends Component {

    public maxHP: number;
    public currentHP: number;
    public isDead: boolean;

    public reset(obj: DamagableComp) {
        obj.maxHP = obj.currentHP =30;
        obj.isDead = false;
    }

}

export enum EntityDeathType {
    SHOT,
    MEELE,
    OTHER
}

export const EntityDeathEvent = "death";