import { SpriteAnimator, AnimationConfig } from '../../../../../utils/spriteAnimator';
import { ecs } from '../../../../../engine/ECS';

export class Damagable extends Component{

    public maxHP: number;
    public currentHP: number;
    public isDead: boolean;

    constructor() {
        this.maxHP = this.currentHP =30;
        this.isDead = false;
    }

}

export enum EntityDeathType {
    SHOT,
    MEELE,
    OTHER
}

export const EntityDeathEvent = "death";

export const DamagableComp = ecs.registerComponent(Damagable);