import { Keycodes } from '../../input/keyboard';
import { input } from '../../input/input';
import { Resource } from '../../stages/base/loader/loader';
import 'pixi-sound'

export class SFX {


    constructor() {
        input.keyboard.onDown(Keycodes.KEY_S, () => {
            PIXI.sound.toggleMuteAll();
        })
    }
    public get(resource: Resource) {
        return PIXI.sound.find(resource.loaded.name);
    }

    public play(res: Resource) {
        let sound = this.get(res);
        if (!sound.isPlaying)
            sound.play();
    }

    public stop(res: Resource) {
        let sound = this.get(res);
        sound.stop();
    }

    public loop(res: Resource) {
        let sound = this.get(res);
        sound.loop = true;
        if (!sound.isPlaying)
            sound.play();
    }

    public fadeOutAll(durationMs: number) {
        PIXI.tweenManager.createTween(PIXI.sound, { time: durationMs })
            .from({ volumeAll: 1 })
            .to({ volumeAll: 0 })
            .start()
            .once('end', () => {
                PIXI.sound.stopAll();
                PIXI.sound.volumeAll = 1;
            })
    }

    public fadeOut(resource: Resource, durationMs: number) {
        let sound = this.get(resource);
        PIXI.tweenManager.createTween(sound, { time: durationMs })
            .from({ volume: 1 })
            .to({ volume: 0 })
            .start()
            .once('end', () => {
                sound.stop();
                sound.volume = 1;
            })
    }

}

