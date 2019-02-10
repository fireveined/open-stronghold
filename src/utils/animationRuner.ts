import { Animation } from './spriteAnimator';
import EventEmitter = PIXI.utils.EventEmitter;

export class AnimationRuner {
    private animation!: Animation;
    private _currentFrame!: number;
    private prevFrame!: number;
    private frameTime!: number;
    private timeSinceLastChange!: number;
    private stopped!: boolean;
    public events: EventEmitter;
    public animationFrameEvent: EventEmitter;
    private _numFrames: number;

    constructor() {
        this.events = new EventEmitter();
    }

    public run(animation: Animation) {
        this.animation = animation;
        this._numFrames = this.animation.config.numFrames;
        if (this.animation.config.pingPong) {
            this._numFrames += this._numFrames - 2;
        }

        this._currentFrame = 0;
        this.frameTime = 1000 / animation.config.FPS;
        this.timeSinceLastChange = 0;
        this.prevFrame = -1;
        this.stopped = false;
        this.events.removeAllListeners();
    }

    public onAnimationEnd(callback: Function) {
        //    this.animationEndEvent.attach(() => callback());
    }

    public getCurrentAnimation() {
        return this.animation;
    }

    public isStopped() {
        return this.stopped;
    }

    public update(delta: number) {
        if (this.stopped) {
            return;
        }

        this.prevFrame = this._currentFrame;
        this.timeSinceLastChange += delta;
        while (this.timeSinceLastChange > this.frameTime) {
            this._currentFrame = this.getNextFrame();
            this.events.emit("frame", this._currentFrame);
            this.timeSinceLastChange -= this.frameTime;
        }
    }

    public stop() {
        this.stopped = true;
        this._currentFrame = 0;
    }

    public resume(): void {
        this.stopped = false;
    }

    private getNextFrame() {
        let frame = this._currentFrame + 1;
        if (frame >= this._numFrames) {
            this.events.emit("end", frame);
            if (this.animation.config.loop) {
                frame = 0;
            } else {
                this.stopped = true;
                frame = this._numFrames - 1;
            }

        }
        return frame;
    }

    public didFrameChanged() {
        return this._currentFrame != this.prevFrame;
    }

    public getCurrentFrame(direction: number) {
        return this.animation.frames[direction][this.currentFrame];
    }

    public get currentFrame(): number {
        return this.animation.config.pingPong ? this.getPingPongFrame(this._currentFrame) : this._currentFrame;
    }

    private getPingPongFrame(frame: number): number {
        return frame >= (this.animation.config.numFrames) ? this._numFrames - frame : frame;
    }
}