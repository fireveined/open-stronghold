"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = PIXI.utils.EventEmitter;
class AnimationRuner {
    constructor() {
        this.events = new EventEmitter();
    }
    run(animation) {
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
    onAnimationEnd(callback) {
        //    this.animationEndEvent.attach(() => callback());
    }
    getCurrentAnimation() {
        return this.animation;
    }
    isStopped() {
        return this.stopped;
    }
    update(delta) {
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
    stop() {
        this.stopped = true;
        this._currentFrame = 0;
    }
    resume() {
        this.stopped = false;
    }
    getNextFrame() {
        let frame = this._currentFrame + 1;
        if (frame >= this._numFrames) {
            this.events.emit("end", frame);
            if (this.animation.config.loop) {
                frame = 0;
            }
            else {
                this.stopped = true;
                frame = this._numFrames - 1;
            }
        }
        return frame;
    }
    didFrameChanged() {
        return this._currentFrame != this.prevFrame;
    }
    getCurrentFrame(direction) {
        return this.animation.frames[direction][this.currentFrame];
    }
    get currentFrame() {
        return this.animation.config.pingPong ? this.getPingPongFrame(this._currentFrame) : this._currentFrame;
    }
    getPingPongFrame(frame) {
        return frame >= (this.animation.config.numFrames) ? this._numFrames - frame : frame;
    }
}
exports.AnimationRuner = AnimationRuner;
