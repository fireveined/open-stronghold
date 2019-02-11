"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TileMapLoader {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    load() {
        const tiles = [];
        const trees = [];
        for (let x = 0; x < this.width; x++) {
            tiles[x] = [];
            trees[x] = [];
            for (let y = 0; y < this.height; y++) {
                tiles[x][y] = { type: Math.round(Math.random() * 0.7) };
                if (Math.random() > 0.98) {
                    trees[x][y] = { type: Math.round(Math.random() * 4.5) + 2 };
                }
            }
        }
        return {
            layers: [{
                    tiles: tiles
                }, { tiles: trees }]
        };
    }
}
exports.TileMapLoader = TileMapLoader;
