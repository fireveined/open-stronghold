import { PlainSpriteView } from './Plain';
import { TileViewFactory } from '../TileViewFactory';
import { ITileView } from '../interfaces/ITileView';
import { ITileData } from '../interfaces/ITileData';
import { AnimationConfig, SpriteAnimator } from '../../../../../utils/spriteAnimator';
import { PlantEntityFactory } from '../../../objects/entities/Plant';

export class TreeViewFactory extends TileViewFactory {

    constructor(private _atlas: PIXI.loaders.Resource, private _name: string) {
        super();
    }

    public create(tiles: ITileData[][], x: number, y: number): any {

        const entity = PlantEntityFactory.create(this._atlas, this._name);
        entity.sprite.scale.set(Math.random() * 0.3 + 0.85);

        entity.x = x;
        entity.y = y;
        return entity.sprite;
        // return new TreeView(this._name, this._atlas, this._tilePlacement.getTilePosition(x, y));
    }
}


export class TreeView extends PIXI.Sprite implements ITileView {

    private _windAnimation: AnimationConfig;
    constructor(name: string, atlas: PIXI.loaders.Resource, pos: PIXI.Point) {
        super();

        // PlantEntityFactory.create(Resources.TREES.loaded, "oak");
        this.anchor.set(0.5, 1);
        const animator = new SpriteAnimator(atlas, [this._windAnimation]);
        animator.attachTo(this);
        setTimeout(() => animator.runAnimation("idle"), Math.random() * 1400);
        this.position = pos;
        this.scale.set(Math.random() * 0.3 + 0.85);
        (this as any).z = pos.y / 10;;;


    }
}