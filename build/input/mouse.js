"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.bind();
    }
    bind() {
        document.getElementsByTagName('canvas')[0].addEventListener('mousemove', (event) => {
            this.x = event.offsetX;
            this.y = event.offsetY;
        });
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
exports.Mouse = Mouse;
