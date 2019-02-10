export class TileViewPlacementStrategy {

    public x: number;
    public y: number;

    constructor(public tileWidth: number, public tileHeight: number) {
    }

    public getTilePosition(x: number, y: number): void{
       this.x = Math.round(x * this.tileWidth + y % 2 * this.tileWidth / 2);
       this.y = Math.round(y * this.tileHeight / 2);
    }
}