"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlainSpriteView extends PIXI.Sprite {
    constructor(atlas, name, x, y, z) {
        super();
        this.texture = atlas.textures[name + ".png"];
        this.position.set(x, y);
        this.z = 0.1;
    }
}
exports.PlainSpriteView = PlainSpriteView;
