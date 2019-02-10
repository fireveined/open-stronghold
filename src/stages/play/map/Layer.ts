import { TileViewFactories } from './tiles/TileViewFactory';
import { ITileView } from './tiles/interfaces/ITileView';
import { ITileData } from './tiles/interfaces/ITileData';

export interface LayerData {
    tiles: ITileData[][];
}

export class Layer extends PIXI.Container{

    private _tiles: ITileView[][];

    constructor(data: LayerData, viewFactory: TileViewFactories) {
        super();
        
        this._tiles = viewFactory.createViews(data.tiles);
        this._tiles.forEach(row => row.forEach(tile => this.addChild(tile)));
    }
}