import { EntityViewFactory, System, SystemEntityType, EntityOf, ComponentInitializator } from "perform-ecs"
import {  PositionComp } from '../components/PositionComp';
import {  AnimatedViewComp } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { WandererComp } from '../components/wanderer/WandererComp';
import { WalkableComp } from '../components/walkable/WalkableComp';
import { StateComp } from "../components/state/StateComp";
import { DefaultStateComp } from "../components/state/DefaultStateComp";
import { ShootingComp } from "../components/shooting/ShootingComp";
import { EventEmmiterComp } from "../components/EventEmmiterComp";
import { MisslesColliderComp } from "../components/misslesCollider/MisslesColliderComp";
import { HPBarComp } from "../components/damagable/HPBarComp";
import { DamagableComp } from "../components/damagable/DamagableComp";
import { FadeOnDeathComp } from "../components/deathBehaviour/FadeOnDeathComp";
import { MeleeFighterComp } from "../components/meele/MeleeFigherComp";


function createAnimConfig(config: { objectName: string, animName: string, numFrames?: number, FPS?: number, allDirections?: boolean, loop?: boolean, pingPong?: boolean }) {
    return <AnimationConfig>{
        name: config.animName,
        textureName: (frameNumber: number, direction: number) => `${config.objectName}_${config.animName}_${direction}_${frameNumber}.png`,
        numFrames: config.numFrames || 16,
        FPS: config.FPS || 16,
        allDirections: config.allDirections,
        loop: config.loop,
        pingPong: config.pingPong
    }
}


const runAnim = (name: string) => createAnimConfig({
    animName: "run",
    objectName: name,
    allDirections: true,
    loop: true
});


const walkAnim = (name: string) => createAnimConfig({
    animName: "walk",
    objectName: name,
    allDirections: true,
    loop: true
});

const idleAnim = (name: string) => createAnimConfig({
    animName: "idle",
    objectName: name,
    allDirections: false,
    loop: true,
    FPS: 8,
    pingPong: true
});

const shootDeathAnim = (name: string) => createAnimConfig({
    animName: "shot_death",
    objectName: name,
    allDirections: false,
    FPS: 20,
    numFrames: 24
});

const meleeDeathAnim = (name: string) => createAnimConfig({
    animName: "melee_death",
    objectName: name,
    allDirections: false,
    FPS: 20,
    numFrames: 24
});

const meleeFightAnim = (name: string, frames: number = 12) => createAnimConfig({
    animName: "melee_fight",
    objectName: name,
    allDirections: true,
    FPS: 10,
    numFrames: frames,
    loop: true
});

const shootAnim = (name: string) => createAnimConfig({
    animName: "shot",
    objectName: name,
    allDirections: true,
    FPS: 8,
    numFrames: 24
});

export function Archer(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {component: EventEmmiterComp},
        {component: MisslesColliderComp},
        {component: StateComp},
        {component: DamagableComp},
        {component: PositionComp},
        {
            component: AnimatedViewComp, args: [atlas,
                [runAnim(name), idleAnim(name), shootAnim(name), shootDeathAnim(name), meleeFightAnim(name, 8), meleeDeathAnim(name)]]
        },
        {component: DefaultStateComp, args: ["idle"]},
        {component: WandererComp},
        {component: ShootingComp},
        {component: HPBarComp},
        {component: FadeOnDeathComp},
        {component: MeleeFighterComp}
    ];
}

export function Spearman(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {component: EventEmmiterComp},
        {component: MisslesColliderComp},
        {component: StateComp},
        {component: DamagableComp},
        {component: PositionComp},
        {
            component: AnimatedViewComp,
            args: [atlas, [walkAnim(name), idleAnim(name), shootDeathAnim(name), meleeFightAnim(name, 12), meleeDeathAnim(name)]]
        },
        {component: DefaultStateComp, args: ["idle"]},
        {component: WandererComp},
        {component: WalkableComp},
        {component: HPBarComp},
        {component: FadeOnDeathComp},
        {component: MeleeFighterComp}
    ];
}

