"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
class TileMap extends PIXI.Container {
    constructor(data, viewFactory) {
        super();
        this._layers = [];
        data.layers.forEach((layer, index) => {
            const layerView = new Layer_1.Layer(layer, viewFactory);
            this._layers.push(layerView);
            if (index === 0) {
                layerView.cacheAsBitmap = true;
                layerView.z = 1;
            }
            this.addChild(layerView);
        });
        ///   (<any>this._layers[0]).z = 0.1;
        // setTimeout(() => this._layers[0].cacheAsBitmap = true, 1000)
        this.positions = viewFactory.tilePlacementStrategy;
        this._pixelWidth = data.layers[0].tiles.length * viewFactory.tileSize.x;
        this._pixelHeight = data.layers[0].tiles[0].length * viewFactory.tileSize.y / 2;
        this.interactiveChildren = false;
    }
    get pixelWidth() {
        return this._pixelWidth;
    }
    get pixelHeight() {
        return this._pixelHeight;
    }
}
exports.TileMap = TileMap;
