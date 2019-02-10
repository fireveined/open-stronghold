import { SyncEvent } from 'ts-events';

interface IKey {
    code: Keycode | number;
    isDown: boolean;
    isUp: boolean;
    press: SyncEvent<void>;
    release: SyncEvent<void>;
    downHandler: (event: KeyboardEvent) => void;
    upHandler: (event: KeyboardEvent) => void;
}

export enum Keycodes {
    KEY_SPACE = 32,
    KEY_RIGHT = 39,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_DOWN = 40,
    KEY_S = 83
}

declare type Keycode = Keycodes | number;

declare type KeyMap = { [key: number]: IKey };
export class Keyboaard {

    private keys: KeyMap;

    constructor() {
        this.keys = {};
        this.initEvents();
    }

    public onDown(key: Keycode, callback: () => void) {
        this.getKey(key).press.attach(callback);
    }

    public onceDown(key: Keycode, callback: () => void) {
        this.getKey(key).press.once(callback);
    }

    public isPressed(key: Keycode) {
        return this.getKey(key).isDown;
    }

    private getKey(key: Keycode) {
        if (!this.keys[key])
            this.initKey(key);

        return this.keys[key];
    }

    private initEvents() {
        let downHandler = (event: KeyboardEvent) => {
            let key = this.keys[event.keyCode];
            if (!key)
                return;

            if (key.isUp) key.press.post(void 0);
            key.isDown = true;
            key.isUp = false;

            event.preventDefault();
        };

        let upHandler = (event: KeyboardEvent) => {
            let key = this.keys[event.keyCode];
            if (!key)
                return;

            if (key.isDown) key.release.post(void 0);
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        };

        window.addEventListener(
            "keydown", downHandler, false
        );
        window.addEventListener(
            "keyup", upHandler, false
        );
    }
    private initKey(keyCode: Keycode) {
        let key = <IKey>{};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = new SyncEvent<void>();
        key.release = new SyncEvent<void>();
        this.keys[keyCode] = key;
    }
}