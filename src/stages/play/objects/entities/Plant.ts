import { ecs } from '../../../../engine/ECS';
import { PositionComp, Position } from '../components/PositionComp';
import { AnimatedViewComp, AnimatedView } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { ComponentInitializator } from '../../../../ecs/Component';
import { PlainSpriteView } from '../../map/tiles/types/Plain';
import { create } from 'domain';
import { EntityFactory } from '../../../../ecs/EntityFactory';
import { Entity } from '../../../../ecs';

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

function plant(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        { constructor: PositionComp },
        { constructor: AnimatedViewComp, args: [atlas, [windAnimation(name)]] }
    ];

}




export class Factory {

    constructor(private _factory: EntityFactory) {

    }
    public create(atlas: PIXI.loaders.Resource, name: string): PlantEntity {
        return this._factory.create(atlas, name) as any;
    }
}


export type PlantEntity = Entity & Position & AnimatedView;
export const PlantEntityFactory = new Factory(ecs.createEntityFactory<typeof plant>(plant));