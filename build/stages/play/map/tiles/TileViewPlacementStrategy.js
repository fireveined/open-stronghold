"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TileViewPlacementStrategy {
    constructor(tileWidth, tileHeight) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
    getTilePosition(x, y) {
        this.x = Math.round(x * this.tileWidth + y % 2 * this.tileWidth / 2);
        this.y = Math.round(y * this.tileHeight / 2);
    }
}
exports.TileViewPlacementStrategy = TileViewPlacementStrategy;
