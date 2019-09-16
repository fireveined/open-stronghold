import { TileViewFactories } from './tiles/TileViewFactory';
import { Layer, LayerData } from "./Layer";
import { TileViewPlacementStrategy } from "./tiles/TileViewPlacementStrategy";

export interface TileMapData {
    layers: LayerData[];
}

export class TileMap extends PIXI.Container {

    public layers: Layer[];
    private _pixelWidth: number;
    private _pixelHeight: number;
    private _width: number;
    private _height: number;
    public positions: TileViewPlacementStrategy;

    constructor(data: TileMapData, viewFactory: TileViewFactories) {
        super();
        this.layers = [];

        data.layers.forEach((layer, index) => {
            const layerView = new Layer(layer, viewFactory);
            this.layers.push(layerView);
            if (index === 0) {
                layerView.cacheAsBitmap = true;
                setTimeout(() => (<any>layerView)._cacheData.sprite.z = 0.1, 50);
                (<any>layerView).z = 0.1;

            }
            this.addChild(layerView);
        });

        ///   (<any>this._layers[0]).z = 0.1;
        // setTimeout(() => this._layers[0].cacheAsBitmap = true, 1000)
        this.positions = viewFactory.tilePlacementStrategy;
        this._pixelWidth = data.layers[0].tiles.length * viewFactory.tileSize.x;
        this._pixelHeight = data.layers[0].tiles[0].length * viewFactory.tileSize.y / 2;

        this._width = data.layers[0].tiles.length;
        this._height = data.layers[0].tiles[0].length;
       // this.interactiveChildren = false;
        this.interactive = true;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number{
        return this._height;
    }

    public get pixelWidth(): number {
        return this._pixelWidth;
    }

    public get pixelHeight(): number {
        return this._pixelHeight;
    }
}