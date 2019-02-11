"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_events_1 = require("ts-events");
var Keycodes;
(function (Keycodes) {
    Keycodes[Keycodes["KEY_SPACE"] = 32] = "KEY_SPACE";
    Keycodes[Keycodes["KEY_RIGHT"] = 39] = "KEY_RIGHT";
    Keycodes[Keycodes["KEY_LEFT"] = 37] = "KEY_LEFT";
    Keycodes[Keycodes["KEY_UP"] = 38] = "KEY_UP";
    Keycodes[Keycodes["KEY_DOWN"] = 40] = "KEY_DOWN";
    Keycodes[Keycodes["KEY_S"] = 83] = "KEY_S";
})(Keycodes = exports.Keycodes || (exports.Keycodes = {}));
class Keyboaard {
    constructor() {
        this.keys = {};
        this.initEvents();
    }
    onDown(key, callback) {
        this.getKey(key).press.attach(callback);
    }
    onceDown(key, callback) {
        this.getKey(key).press.once(callback);
    }
    isPressed(key) {
        return this.getKey(key).isDown;
    }
    getKey(key) {
        if (!this.keys[key])
            this.initKey(key);
        return this.keys[key];
    }
    initEvents() {
        let downHandler = (event) => {
            let key = this.keys[event.keyCode];
            if (!key)
                return;
            if (key.isUp)
                key.press.post(void 0);
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        };
        let upHandler = (event) => {
            let key = this.keys[event.keyCode];
            if (!key)
                return;
            if (key.isDown)
                key.release.post(void 0);
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        };
        window.addEventListener("keydown", downHandler, false);
        window.addEventListener("keyup", upHandler, false);
    }
    initKey(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = new ts_events_1.SyncEvent();
        key.release = new ts_events_1.SyncEvent();
        this.keys[keyCode] = key;
    }
}
exports.Keyboaard = Keyboaard;
