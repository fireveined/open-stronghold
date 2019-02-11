"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_1 = require("../../input/keyboard");
const input_1 = require("../../input/input");
require("pixi-sound");
class SFX {
    constructor() {
        input_1.input.keyboard.onDown(keyboard_1.Keycodes.KEY_S, () => {
            PIXI.sound.toggleMuteAll();
        });
    }
    get(resource) {
        return PIXI.sound.find(resource.loaded.name);
    }
    play(res) {
        let sound = this.get(res);
        if (!sound.isPlaying)
            sound.play();
    }
    stop(res) {
        let sound = this.get(res);
        sound.stop();
    }
    loop(res) {
        let sound = this.get(res);
        sound.loop = true;
        if (!sound.isPlaying)
            sound.play();
    }
    fadeOutAll(durationMs) {
        PIXI.tweenManager.createTween(PIXI.sound, { time: durationMs })
            .from({ volumeAll: 1 })
            .to({ volumeAll: 0 })
            .start()
            .once('end', () => {
            PIXI.sound.stopAll();
            PIXI.sound.volumeAll = 1;
        });
    }
    fadeOut(resource, durationMs) {
        let sound = this.get(resource);
        PIXI.tweenManager.createTween(sound, { time: durationMs })
            .from({ volume: 1 })
            .to({ volume: 0 })
            .start()
            .once('end', () => {
            sound.stop();
            sound.volume = 1;
        });
    }
}
exports.SFX = SFX;
