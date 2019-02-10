import { ecs } from '../../../../engine/ECS';
import { PositionComp, Position } from '../components/PositionComp';
import { StaticView, StaticViewComp } from '../components/renderable/ViewComp';
import { AnimationConfig } from '../../../../utils/spriteAnimator';
import { ComponentInitializator } from '../../../../ecs/Component';
import { PlainSpriteView } from '../../map/tiles/types/Plain';
import { create } from 'domain';
import { EntityFactory } from '../../../../ecs/EntityFactory';
import { Entity } from '../../../../ecs';
import { ShootableEntity } from "../components/shooting/ShootableProcessor";
import { ShootableComp, ShootableCompData } from "../components/shooting/ShootableComp";
import { EventEmmiterComp, EventEmmiterCompData } from "../components/EventEmmiterComp";
import { FadeOnDeathProcessor } from "../components/deathBehaviour/FadeOnDeathProcessor";
import { FadeOnDeathComp } from "../components/deathBehaviour/FadeOnDeathComp";


function Arrow(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {constructor: EventEmmiterComp},
        {constructor: PositionComp},
        {constructor: StaticViewComp, args: [atlas, "arrow"]},
        {constructor: ShootableComp},
        {constructor: FadeOnDeathComp}
    ];

}

export class Factory {

    constructor(private _factory: EntityFactory) {

    }

    public create(atlas: PIXI.loaders.Resource, name: string): ArrowEntity {
        return this._factory.create(atlas, name) as any;
    }
}


export type ArrowEntity = Entity & Position & StaticView & ShootableCompData & EventEmmiterCompData;
export const ArrowEntityFactory = new Factory(ecs.createEntityFactory<typeof Arrow>(Arrow));