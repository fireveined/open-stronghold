import { TileViewFactories } from './tiles/TileViewFactory';
import { Layer, LayerData } from "./Layer";
import { TileViewPlacementStrategy } from "./tiles/TileViewPlacementStrategy";

export interface TileMapData {
    layers: LayerData[];
}

export class TileMap extends PIXI.Container {

    private _layers: Layer[];
    private _pixelWidth: number;
    private _pixelHeight: number;
    public positions: TileViewPlacementStrategy;

    constructor(data: TileMapData, viewFactory: TileViewFactories) {
        super();
        this._layers = [];

        data.layers.forEach((layer, index) => {
            const layerView = new Layer(layer, viewFactory);
            this._layers.push(layerView);
            if (index === 0) {
                layerView.cacheAsBitmap = true;
                (<any>layerView).z = 1;
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


    public get pixelWidth(): number {
        return this._pixelWidth;
    }

    public get pixelHeight(): number {
        return this._pixelHeight;
    }
}