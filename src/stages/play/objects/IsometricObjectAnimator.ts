import { IBody } from './Body';
import { AnimationConfig, SpriteAnimator } from '../../../utils/spriteAnimator';
import { Direction } from '../world/Direction';
export interface IGameObject {
    update(): void;
    readonly position: PIXI.Point;
    readonly body: IBody;

}
