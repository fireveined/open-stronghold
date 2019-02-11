"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TileViewPlacementStrategy_1 = require("./TileViewPlacementStrategy");
class TileViewFactory {
    set tilePlacementStrategy(strategy) {
        this._tilePlacement = strategy;
    }
}
exports.TileViewFactory = TileViewFactory;
class TileViewFactories {
    constructor() {
        this._factories = [];
    }
    add(tileType, factory) {
        factory.tilePlacementStrategy = this._placementStrategy;
        this._factories.push({ type: tileType, factory: factory });
    }
    createViews(tiles) {
        const views = [];
        for (let x = 0; x < tiles.length; x++) {
            views[x] = [];
            for (let y = 0; y < tiles[x].length; y++) {
                if (!tiles[x][y]) {
                    continue;
                }
                this._factories.forEach(factory => {
                    if (factory.type === tiles[x][y].type) {
                        views[x][y] = factory.factory.create(tiles, x, y);
                    }
                });
            }
        }
        return views;
    }
    set tileSize(size) {
        this._tileSize = size;
        const placement = new TileViewPlacementStrategy_1.TileViewPlacementStrategy(size.x, size.y);
        this._placementStrategy = placement;
        this._factories.forEach(factory => factory.factory.tilePlacementStrategy = placement);
    }
    get tilePlacementStrategy() {
        return this._placementStrategy;
    }
    ;
    get tileSize() {
        return this._tileSize;
    }
}
exports.TileViewFactories = TileViewFactories;
