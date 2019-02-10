import { SyncEvent } from 'ts-events';
import { logger } from './logger';
import { AnimationRuner } from './animationRuner';
import { Game } from '../game';
import { Direction } from '../stages/play/world/Direction';
import EventEmitter = PIXI.utils.EventEmitter;

export interface AnimationConfig {
    name: string;
    textureName: (frameNumber: number, direction?: number) => string;
    allDirections?: boolean;

    numFrames: number;
    FPS: number;

    pingPong?: boolean;
    loop?: boolean;
}

type FramesForOneDirection = PIXI.Texture[];

export interface Animation {
    config: AnimationConfig;
    frames: FramesForOneDirection[];
}

declare type AnimationMap = { [name: string]: Animation };
declare type AnimationEvents = 'end';

export class SpriteAnimator {
    private animations: AnimationMap;
    private sprite!: PIXI.Sprite;
    private runner: AnimationRuner;
    private _direction: number = 0;

    constructor(atlas: PIXI.loaders.Resource, animations: AnimationConfig[]) {
        this.animations = this.attachFramesTextures(atlas, animations);
        this.runner = new AnimationRuner();
    }


    public attachTo(sprite: PIXI.Sprite) {
        this.sprite = sprite;
        let firstAnimation = this.animations[Object.keys(this.animations)[0]];
        this.runner.run(firstAnimation);
        this.runner.stop();
    }

    public get events(): EventEmitter {
        return this.runner.events;
    }

    public runIfNotRunning(name: string): boolean {
        if (this.runner.getCurrentAnimation().config.name !== name || this.runner.isStopped()) {
            this.runAnimation(name);
            return true;
        }
    }


    public runAnimation(name: string) {
        let anim = this.animations[name];
        if (!anim) {
            console.error(`Can't find animation ${name}`);
            return;
        }
        this.runner.run(anim);
    }


    public hasAnimation(name: string): boolean {
        return this.animations[name] !== undefined;
    }

    public update(delta: number) {
        this.runner.update(delta);

        let frame = this.runner.getCurrentFrame(this.runner.getCurrentAnimation().config.allDirections ? this._direction : 0);
        if (this.sprite && this.sprite.texture != frame) {
            this.sprite.texture = frame;
        }
    }

    public stop() {
        this.runner.stop();
    }

    public resume(): void{
        this.runner.resume();
    }
    public set direction(direction: Direction) {
        this._direction = direction;
    }

    private attachFramesTextures(atlas: PIXI.loaders.Resource, configs: AnimationConfig[]) {
        let animations = <AnimationMap>{};
        for (let config of configs) {
            let animation = <Animation>{
                config,
                frames: this.generateFrames(atlas, config)
            }
            animations[config.name] = animation;
        }
        return animations;
    }

    private generateFrames(resource: PIXI.loaders.Resource, config: AnimationConfig): FramesForOneDirection[] {

        let directions = <FramesForOneDirection[]>[];
        let atlas = resource.textures;

        if (atlas === undefined) {
            logger.error("Can't load textures from " + resource.name);
            return;
        }

        const directionsNum = config.allDirections ? 8 : 1;
        for (let direction = 0; direction < directionsNum; direction++) {
            directions.push([]);

            for (let i = 0; i < config.numFrames; i++) {
                let frameName = config.textureName(i, direction);
                let frame = atlas[frameName];
                if (!frame) {
                    logger.error("Can't find frame " + frameName, atlas);

                }
                directions[direction].push(frame);
            }
        }
        return directions;
    }

}

