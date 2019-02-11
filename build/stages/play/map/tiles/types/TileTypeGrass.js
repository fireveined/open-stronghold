"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plain_1 = require("./Plain");
const TileViewFactory_1 = require("../TileViewFactory");
class GrassViewFactory extends TileViewFactory_1.TileViewFactory {
    constructor(_atlas) {
        super();
        this._atlas = _atlas;
    }
    create(tiles, x, y) {
        this._tilePlacement.getTilePosition(x, y);
        return new Plain_1.PlainSpriteView(this._atlas, "grass (" + Math.round(Math.random() * 12 + 1).toString() + ")", this._tilePlacement.x, this._tilePlacement.y, y);
    }
}
exports.GrassViewFactory = GrassViewFactory;
