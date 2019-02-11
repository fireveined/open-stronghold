import { ecs } from '../../../../engine/ECS';
import { PositionComp } from '../components/PositionComp';
import { AnimatedViewComp } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { WandererComp } from '../components/wanderer/WandererComp';
import { WalkableComp } from '../components/walkable/WalkableComp';
import { StateComp } from "../components/state/StateComp";
import { DefaultStateComp } from "../components/state/DefaultStateComp";
import { EventEmmiterComp } from "../components/EventEmmiterComp";
import { DamagableComp } from "../components/damagable/DamagableComp";
import { HPBarComp } from "../components/damagable/HPBarComp";
import { FadeOnDeathComp } from "../components/deathBehaviour/FadeOnDeathComp";
import { EntityViewFactory, System, SystemEntityType, EntityOf, ComponentInitializator } from "perform-ecs"


function createAnimConfig(config: { objectName: string, animName: string, numFrames?: number, FPS?: number, allDirections?: boolean, loop?: boolean }) {
    return <AnimationConfig>{
        name: config.animName,
        textureName: (frameNumber: number, direction: number) => `${config.objectName}_${config.animName}_${direction}_${frameNumber}.png`,
        numFrames: config.numFrames || 16,
        FPS: config.FPS || 16,
        allDirections: config.allDirections,
        loop: config.loop
    }
}


const walkAnim = (name: string) => createAnimConfig({
    animName: "walk",
    objectName: name,
    allDirections: true,
    loop: true
});

const sitAnim = (name: string) => createAnimConfig({
    animName: "idle",
    objectName: name,
    allDirections: true
});


export function Deer(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {component: EventEmmiterComp},
        //    {constructor: MisslesColliderComp},
        {component: DamagableComp},
        {component: StateComp},
        {component: PositionComp},
        {component: AnimatedViewComp, args: [atlas, [walkAnim(name), sitAnim(name)]]},
        {component: DefaultStateComp, args: ["idle"]},
        {component: WandererComp},
        {component: WalkableComp},
        {component: HPBarComp},
        {component: FadeOnDeathComp}
    ];

}
