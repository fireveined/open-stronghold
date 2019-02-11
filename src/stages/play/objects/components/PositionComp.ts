import { Component, EntityOf, makeComponent } from "perform-ecs"

@makeComponent
export class PositionComp extends Component {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public direction: number;

    public reset(obj: PositionComp) {
        obj.x = 0;
        obj.y = 0;
        obj.width = 20;
        obj.height = 20;
        obj.direction = 0;
    }
}

let dir: any = {'-1': {}, '0': {}, '1': {}};

dir[1][-1] = 0;
dir[1][0] = 1;
dir[1][1] = 2;
dir[0][1] = 3;
dir[-1][1] = 4;
dir[-1][0] = 5;
dir[-1][-1] = 6;
dir[0][-1] = 7;

export function getDirectionTowardsPoint(entity: EntityOf<PositionComp>, x: number, y: number): number {
    const signX = Math.sign(x - entity.x);
    const signY = Math.sign(y - entity.y);
    return dir[signX][signY] !== undefined ? dir[signX][signY] : entity.direction;
}


export function getDirectionTowardsPointByAngle(entity: EntityOf<PositionComp>, x: number, y: number): number {
    let angle = Math.atan2((y - entity.y) * 0.9, x - entity.x) * 180 / Math.PI + 45 + 23;
    if (angle < 0) {
        angle += 360;
    }
    return Math.floor(angle / 45);
}

