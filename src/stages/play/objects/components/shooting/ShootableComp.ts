import { Component, makeComponent } from "perform-ecs"

@makeComponent
export class ShootableComp extends Component {

    public startY: number;
    public targetX: number;
    public targetY: number;
    public speed: number ;
    public yHeight: number;
    public yVel: number;
    public hitTheGround: boolean;
    public wholeDistance: number;
    public hitRadius: number;
    public hitDamage: number;

    public reset(obj: ShootableComp) {
        obj.yHeight = 0;
        obj.speed = 35;
        obj.hitRadius = 1;
        obj.hitDamage = 8;
    }

}

