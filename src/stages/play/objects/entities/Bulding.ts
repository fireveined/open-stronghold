import { PositionComp } from '../components/PositionComp';
import { StaticViewComp } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { ComponentInitializator } from "perform-ecs"
import { MapColliderComp } from "../components/mapCollider/MapColliderComp";
import { Resources } from "../../resources";
import { IPoint } from "../../map/CollisionMap";

function windAnimation(name: string): AnimationConfig {
    return {
        name: "idle",
        textureName: (frameNumber: number) => `${name} (${frameNumber + 1}).png`,
        numFrames: 12,
        FPS: 8 + Math.round(Math.random() * 4),
        pingPong: true,
        loop: true
    }
};

export function Building(atlas: PIXI.loaders.Resource, name: string, x: number, y: number, collisionFields: IPoint[]): ComponentInitializator[] {
    return [
        {component: PositionComp, args: [x, y]},
        {component: StaticViewComp, args: [atlas, name]},
        {component: MapColliderComp, args: [collisionFields]}
    ];

}


export function Hunter(x: number, y: number): ComponentInitializator[] {
    const collisionFields: IPoint[] = [{x: 2, y: 2}];
    return Building(Resources.BUILDINGS.loaded, "hunter", x, y, collisionFields);
}

export function Barracks(x: number, y: number): ComponentInitializator[] {
    const collisionFields: IPoint[] = [{x: 3, y: 3}];
    return Building(Resources.BUILDINGS.loaded, "barracks", x, y, collisionFields);
}
