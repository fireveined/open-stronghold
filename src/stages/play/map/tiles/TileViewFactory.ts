import { TileViewPlacementStrategy } from './TileViewPlacementStrategy';
import { ITileView } from './interfaces/ITileView';
import { ITileData, TileType } from './interfaces/ITileData';



export abstract class TileViewFactory {
    protected _tilePlacement: TileViewPlacementStrategy

    public set tilePlacementStrategy(strategy: TileViewPlacementStrategy) {
        this._tilePlacement = strategy;
    }

    public abstract create(tiles: ITileData[][], x: number, y: number): ITileView;
}

export class TileViewFactories {

    private _factories: { type: TileType, factory: TileViewFactory }[] = [];
    private _tileSize: PIXI.Point;
    private _placementStrategy: TileViewPlacementStrategy;

    public add(tileType: TileType, factory: TileViewFactory) {
        factory.tilePlacementStrategy = this._placementStrategy;
        this._factories.push({ type: tileType, factory: factory });
    }

    public createViews(tiles: ITileData[][]): ITileView[][] {
        const views: ITileView[][] = [];

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
                })
            }
        }
        return views;
    }


    public set tileSize(size: PIXI.Point) {
        this._tileSize = size;
        const placement = new TileViewPlacementStrategy(size.x, size.y);
        this._placementStrategy = placement;
        this._factories.forEach(factory => factory.factory.tilePlacementStrategy = placement);
    }

    public get tilePlacementStrategy(){
        return this._placementStrategy
    };

    public get tileSize(): PIXI.Point {
        return this._tileSize
    }
}