import { TileMap } from "./TileMap";
import PointLike = PIXI.PointLike;

export interface CollisionMapTile {
    collision: boolean;
}

export interface IPoint {
    x: number;
    y: number
}
export class CollisionMap {


    public tiles: CollisionMapTile[][];

    constructor(tileMap: TileMap) {
        this.tiles = [];
        for (let x = 0; x < tileMap.width; x++) {
            this.tiles[x] = []
            for (let y = 0; y < tileMap.height; y++) {
                this.tiles[x][y] = {collision: false};
            }
        }
    }

    public markAsUsed(x: number, y: number, fields: IPoint[]): void {
        console.log(fields);
        fields.forEach(field => {
            this.tiles[x + field.x][y + field.y].collision = true;
        })
    }
}