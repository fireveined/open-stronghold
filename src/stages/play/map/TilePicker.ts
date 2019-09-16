import { CollisionMap } from "./CollisionMap";
import { TileMap } from "./TileMap";


export class TilePicker extends PIXI.Container {

    public static FIELD_CHANGED: string = "field_changed";

    private _map: CollisionMap;
    private _tileMap: TileMap;
    private _mark: PIXI.Text;

    private _prevTileX: number;
    private _prevTileY: number;

    constructor(collision: CollisionMap, tileMap: TileMap) {
        super();
        this._map = collision;

        this._tileMap = tileMap;

        this._mark = new PIXI.Text();
        this._mark.style.fill = "red";
        this._mark.style.fontSize = "13px";
        this.addChild(this._mark);

        tileMap.addChild(this._mark);
    }

    public start(): void {
        this._tileMap.on("mousemove", (event: PIXI.interaction.InteractionEvent) => {
            let pos = event.data.getLocalPosition(this._tileMap);
            /*
                   this.x = Math.round(x * this.tileWidth + y % 2 * this.tileWidth / 2);
       this.y = Math.round(y * this.tileHeight / 2);

             */
            const placement = this._tileMap.positions;
            const tileY = Math.floor(pos.y / placement.tileHeight * 2);
            const tileX = Math.floor((pos.x - pos.y % placement.tileHeight) / placement.tileWidth);

            if ((this._prevTileX === tileX && this._prevTileY === tileY)
                || tileY < 0 || tileX < 0 || tileX >= this._tileMap.width || tileY >= this._tileMap.height) {
                return;
            }
            this._prevTileX = tileX;
            this._prevTileY = tileY;
            this._tileMap.positions.getTilePosition(tileX, tileY);
            const x = this._tileMap.positions.x;
            const y = this._tileMap.positions.y;
            this._mark.text = `${tileX}x${tileY}`;
            this._mark.x = x;
            this._mark.y = y;

            if(this._map.tiles[tileX][tileY].collision){
                this._mark.style.fill = "red";
            } else {
                this._mark.style.fill = "rgb(120,255,120)";
            }
            this.emit(TilePicker.FIELD_CHANGED, tileX, tileY);
        })
    }
}