import { ecs } from '../../../../engine/ECS';
import { PositionComp, Position } from '../components/PositionComp';
import { AnimatedViewComp, AnimatedView } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { ComponentInitializator } from '../../../../ecs/Component';
import { PlainSpriteView } from '../../map/tiles/types/Plain';
import { create } from 'domain';
import { EntityFactory } from '../../../../ecs/EntityFactory';
import { Entity } from '../../../../ecs';
import { WandererComp } from '../components/wanderer/WandererComp';
import { WalkableComp } from '../components/walkable/WalkableComp';
import { StateComp } from "../components/state/StateComp";
import { DefaultStateComp } from "../components/state/DefaultStateComp";
import { EventEmmiterComp } from "../components/EventEmmiterComp";
import { MisslesColliderComp } from "../components/misslesCollider/MisslesColliderComp";
import { DamagableComp } from "../components/damagable/DamagableComp";
import { HPBarComp } from "../components/damagable/HPBarComp";
import { FadeOnDeathComp } from "../components/deathBehaviour/FadeOnDeathComp";


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


function Deer(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {constructor: EventEmmiterComp},
    //    {constructor: MisslesColliderComp},
        {constructor: DamagableComp},
        {constructor: StateComp},
        {constructor: PositionComp},
        {constructor: AnimatedViewComp, args: [atlas, [walkAnim(name), sitAnim(name)]]},
        {constructor: DefaultStateComp, args: ["idle"]},
        {constructor: WandererComp},
        {constructor: WalkableComp},
        {constructor: HPBarComp},
        {constructor: FadeOnDeathComp}
    ];

}


export class Factory {

    constructor(private _factory: EntityFactory) {

    }

    public create(atlas: PIXI.loaders.Resource, name: string): DeerEntity {
        return this._factory.create(atlas, name) as any;
    }
}


export type DeerEntity = Entity & Position & AnimatedView;
export const DeerEntityFactory = new Factory(ecs.createEntityFactory<typeof Deer>(Deer));