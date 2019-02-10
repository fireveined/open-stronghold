import { ecs } from '../../../../engine/ECS';
import { PositionComp, Position } from '../components/PositionComp';
import { AnimatedViewComp, AnimatedView, StaticViewComp, StaticView } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { ComponentInitializator } from '../../../../ecs/Component';
import { PlainSpriteView } from '../../map/tiles/types/Plain';
import { create } from 'domain';
import { EntityFactory } from '../../../../ecs/EntityFactory';
import { Entity } from '../../../../ecs';


function building(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        { constructor: PositionComp },
        { constructor: StaticViewComp, args: [atlas, name] }
    ];

}

export class Factory {

    constructor(private _factory: EntityFactory) {

    }
    public create(atlas: PIXI.loaders.Resource, name: string): BuldingEntity {
        return this._factory.create(atlas, name) as any;
    }
}


export type BuldingEntity = Entity & Position & StaticView;
export const BuildingEntityFactory = new Factory(ecs.createEntityFactory<typeof building>(building));