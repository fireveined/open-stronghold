
import { Layer, LayerData } from "./Layer";
import { TileMapData } from './TileMap';
import { ITileData } from "./tiles/interfaces/ITileData";

export interface ITileMapLoader {
    load(): TileMapData;
}
export class TileMapLoader implements ITileMapLoader {

    constructor(public width: number, public height: number) {

    }

    public load(): TileMapData {
        const tiles: ITileData[][] = [];
        const trees: ITileData[][] = [];

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
            layers: [<LayerData>{
                tiles: tiles
            }, { tiles: trees }]
        };
    }
}