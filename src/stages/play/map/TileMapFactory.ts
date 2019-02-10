

import { TileViewFactories, TileViewFactory } from './tiles/TileViewFactory';
import { ITileMapLoader } from './TileMapLoader';
import { TileMap } from './TileMap';
import { Point } from 'pixi.js';
import { TileViewPlacementStrategy } from './tiles/TileViewPlacementStrategy';
import { TileType } from './tiles/interfaces/ITileData';


export class TileMapFactory {

    private _viewFactories: TileViewFactories;
    private _loader: ITileMapLoader;

    constructor(loader: ITileMapLoader) {
        this._loader = loader;
        this._viewFactories = new TileViewFactories();
        this._viewFactories.tileSize = new Point(28, 15);
    }

    public registerTileType(type: TileType, viewFactory: TileViewFactory) {
        this._viewFactories.add(type, viewFactory);
    }

    public create(): TileMap {

        return new TileMap(this._loader.load(), this._viewFactories);
    }

    public get tilePlacementStrateegy(){
        return this._viewFactories.tilePlacementStrategy;
    }


}