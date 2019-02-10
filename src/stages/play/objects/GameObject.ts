import { IBody } from './Body';
import { AnimationConfig, SpriteAnimator } from '../../../utils/spriteAnimator';
export interface IGameObject {
    update(): void;
    readonly position: PIXI.Point;
    readonly body: IBody;

}

function createAnimConfig(config: { objectName: string, animName: string, numFrames?: number, FPS?: number, allDirections?: boolean }) {
    return <AnimationConfig>{
        name: config.animName,
        textureName: (frameNumber: number, direction: number) => `${config.objectName}_${config.animName}_${direction}_${frameNumber}.png`,
        numFrames: config.numFrames || 16,
        FPS: config.FPS || 16,
        allDirections: config.allDirections
    }
}
export class Animal extends PIXI.Sprite {

    constructor(atlas: PIXI.loaders.Resource, objectName: string, pos: PIXI.Point) {
        super();
        const walkAnim = createAnimConfig({
            animName: "walk",
            objectName: objectName,
            allDirections: true
        });
        this.anchor.set(0.5, 1);
        const animator = new SpriteAnimator(atlas, [walkAnim]);
        animator.attachTo(this);
        animator.runAnimation("walk");
        this.position = pos;

        setInterval(() => { animator.update(30) }, 30);

        document.addEventListener("keydown", (ev) => {
            this.position.y += 5;
        })

        document.addEventListener("keyup", (ev) => {
            this.position.y -= 50;
        })
    }

}