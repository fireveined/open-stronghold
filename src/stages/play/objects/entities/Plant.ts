import { ecs } from '../../../../engine/ECS';
import { PositionComp } from '../components/PositionComp';
import { AnimatedViewComp } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { EntityViewFactory, System, SystemEntityType, EntityOf, ComponentInitializator } from "perform-ecs"

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

export function Plant(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {component: PositionComp},
        {component: AnimatedViewComp, args: [atlas, [windAnimation(name)]]}
    ];

}

