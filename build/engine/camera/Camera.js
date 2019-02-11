"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Viewport = require("pixi-viewport");
class Camera {
    constructor(viewport) {
        this._viewport = new Viewport(viewport);
        this._viewport.drag().wheel().clamp().clampZoom({
            minWidth: viewport.screenWidth * 0.75,
            minHeight: viewport.screenHeight * 0.75,
            maxWidth: viewport.worldWidth,
            maxHeight: viewport.worldHeight
        });
        this._viewport.pausePlugin("clamp-zoom");
        this._viewport.on("moved", () => {
            this._viewport.x = Math.round(this._viewport.x);
            this._viewport.y = Math.round(this._viewport.y);
        });
    }
    attachTo(container) {
        const index = container.parent.getChildIndex(container);
        container.parent.addChildAt(this._viewport, index);
        this._viewport.addChild(container);
    }
}
exports.Camera = Camera;
