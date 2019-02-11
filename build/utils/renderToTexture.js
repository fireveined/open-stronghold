"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RendererToTexture {
    constructor(pixiRenderer) {
        this.pixiRenderer = pixiRenderer;
    }
    render(obj, texture, clear) {
        this.pixiRenderer.render(obj, texture, clear);
    }
}
exports.RendererToTexture = RendererToTexture;
