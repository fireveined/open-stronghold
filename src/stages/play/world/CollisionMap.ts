
import { IBody } from '../objects/Body';
export class CollisionMap {

    public readonly width: number;
    public readonly height: number;

    private _map: IBody[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public clear(): void {
        this._map = [];
    }

    public put(body: IBody): void {
        this._map[body.x * this.height + body.y] = body;

    }

    
}

