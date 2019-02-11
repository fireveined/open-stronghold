"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextBlinker {
    constructor(text) {
        let id = setInterval(() => this.swap(text), 700);
        text.once('removed', () => clearInterval(id));
    }
    swap(text) {
        text.visible = !text.visible;
    }
}
exports.TextBlinker = TextBlinker;
