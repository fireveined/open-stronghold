import {ITileView} from "../interfaces/ITileView";

export class PlainSpriteView extends PIXI.Sprite implements ITileView {

    constructor(atlas: PIXI.loaders.Resource, name: string, x: number, y: number, z: number) {
        super();
        this.texture = atlas.textures[name+".png"];
        this.position.set(x, y);
        (this as any).z = 0.1;
    }
}