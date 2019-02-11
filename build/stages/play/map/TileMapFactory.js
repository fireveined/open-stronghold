"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TileViewFactory_1 = require("./tiles/TileViewFactory");
const TileMap_1 = require("./TileMap");
const pixi_js_1 = require("pixi.js");
class TileMapFactory {
    constructor(loader) {
        this._loader = loader;
        this._viewFactories = new TileViewFactory_1.TileViewFactories();
        this._viewFactories.tileSize = new pixi_js_1.Point(28, 15);
    }
    registerTileType(type, viewFactory) {
        this._viewFactories.add(type, viewFactory);
    }
    create() {
        return new TileMap_1.TileMap(this._loader.load(), this._viewFactories);
    }
    get tilePlacementStrateegy() {
        return this._viewFactories.tilePlacementStrategy;
    }
}
exports.TileMapFactory = TileMapFactory;
