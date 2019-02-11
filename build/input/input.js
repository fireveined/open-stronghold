"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mouse_1 = require("./mouse");
const keyboard_1 = require("./keyboard");
exports.Keycodes = keyboard_1.Keycodes;
class Input {
    init() {
        this.keyboard = new keyboard_1.Keyboaard();
        this.mouse = new mouse_1.Mouse();
    }
}
exports.Input = Input;
exports.input = new Input();
