"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Layer extends PIXI.Container {
    constructor(data, viewFactory) {
        super();
        this._tiles = viewFactory.createViews(data.tiles);
        this._tiles.forEach(row => row.forEach(tile => this.addChild(tile)));
    }
}
exports.Layer = Layer;
