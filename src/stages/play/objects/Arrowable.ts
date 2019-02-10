// import { ecs } from '../../../engine/ECS';
// import { System, RegisterGroupFunction } from '../../../ecs/SystemFactory';
// import { Entity } from '../../../ecs';
// import { Container } from 'typedi';
// import { Resources } from '../resources';
// import { Texture } from 'pixi.js';
// import { Stage } from '../../base/stage';
// class Arrowable {

// }

// class IPostion {
//     public x: number;
//     public y: number;

//     constructor() {
//         this.x = 100;
//         this.y = 100;
//     }
// }


// class Renderable {
//     sprite: PIXI.Sprite;
// }


// interface RenderableEntity {

// }
// class RenderableSystem implements System {

//     private _stage: PIXI.Container;
//     private _entities: Entity[];

//     public init(stage: PIXI.Container): void {
//         this._stage = stage;
//     }
//     public registerGroup(registerFunc: RegisterGroupFunction) {
//         this._entities = registerFunc([RenderableComp]);
//     }

//     public onEntityAdded(entity: Entity) {
//         const renderable = entity[RenderableComp.id] as Renderable;

//         renderable.sprite = new PIXI.Sprite(Resources.ARCHER.loaded.texture)
//         renderable.sprite.position.set(200, 200);
//         this._stage.addChild(renderable.sprite);
//         console.log("Added", entity);
//     }

//     public update() {
//         let renderable: Renderable;
//         let position: IPostion;
//         for (const entity of this._entities) {
//             renderable = entity[RenderableComp.id];
//             position = entity[PositionComp.id];
//             renderable.sprite.position.set(position.x, position.y);
//         }
//     }
// }


// class ArrowableSystem implements System {

//     private _entities: Entity[];

//     constructor() {
//         window.addEventListener("keydown", () => {
//             let position: IPostion;
//             for (const entity of this._entities) {
//                 position = entity[PositionComp.id];
//                 position.x += 20;
//             }
//         })
//     }

//     public registerGroup(registerFunc: RegisterGroupFunction) {
//         this._entities = registerFunc([ArrowableComp]);
//     }


//     public update() {

//     }
// }

// export const ArrowableComp = ecs.registerComponent(Arrowable);
// export const PositionComp = ecs.registerComponent(IPostion);
// export const RenderableComp = ecs.registerComponent(Renderable);

// export const renderSystem = ecs.createSystem(RenderableSystem) as RenderableSystem;
// export const arrowableSystem = ecs.createSystem(ArrowableSystem) as ArrowableSystem;

// export const HumanFactory = ecs.createEntityFactory([
//     { constructor: ArrowableComp },
//     { constructor: PositionComp },
//     { constructor: RenderableComp },
// ])

