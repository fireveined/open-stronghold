import {PlainSpriteView} from './Plain';
import {TileViewFactory} from '../TileViewFactory';
import {ITileView} from '../interfaces/ITileView';
import {ITileData} from '../interfaces/ITileData';

export class DirtViewFactory extends TileViewFactory {

    constructor(private _atlas: PIXI.loaders.Resource) {
        super();
    }


    public create(tiles: ITileData[][], x: number, y: number): ITileView {
        this._tilePlacement.getTilePosition(x, y);
        return new PlainSpriteView(this._atlas, "rock (" + Math.round(Math.random() * 20+1).toString()+")",
            this._tilePlacement.x, this._tilePlacement.y, y);
    }
}
