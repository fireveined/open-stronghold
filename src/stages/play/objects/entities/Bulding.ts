import { ecs } from '../../../../engine/ECS';
import {  PositionComp } from '../components/PositionComp';
import {  StaticViewComp } from '../components/renderable/ViewComp';



// function building(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
//     return [
//         { constructor: PositionComp },
//         { constructor: StaticViewComp, args: [atlas, name] }
//     ];
//
// }
//
// export class Factory {
//
//     constructor(private _factory: EntityFactory) {
//
//     }
//     public create(atlas: PIXI.loaders.Resource, name: string): BuldingEntity {
//         return this._factory.create(atlas, name) as any;
//     }
// }
//
//
// export type BuldingEntity = Entity & Position & StaticView;
// export const BuildingEntityFactory = new Factory(ecs.createEntityFactory<typeof building>(building));