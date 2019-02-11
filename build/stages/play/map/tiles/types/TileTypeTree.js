"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TileViewFactory_1 = require("../TileViewFactory");
const spriteAnimator_1 = require("../../../../../utils/spriteAnimator");
const ecs_1 = require("../../../../../engine/ecs");
const Plant_1 = require("../../../objects/entities/Plant");
class TreeViewFactory extends TileViewFactory_1.TileViewFactory {
    constructor(_atlas, _name) {
        super();
        this._atlas = _atlas;
        this._name = _name;
    }
    create(tiles, x, y) {
        const entity = ecs_1.ecs.createEntity(Plant_1.Plant(this._atlas, this._name));
        entity.sprite.scale.set(Math.random() * 0.3 + 0.85);
        entity.x = x;
        entity.y = y;
        return entity.sprite;
        // return new TreeView(this._name, this._atlas, this._tilePlacement.getTilePosition(x, y));
    }
}
exports.TreeViewFactory = TreeViewFactory;
class TreeView extends PIXI.Sprite {
    constructor(name, atlas, pos) {
        super();
        // PlantEntityFactory.create(Resources.TREES.loaded, "oak");
        this.anchor.set(0.5, 1);
        const animator = new spriteAnimator_1.SpriteAnimator(atlas, [this._windAnimation]);
        animator.attachTo(this);
        setTimeout(() => animator.runAnimation("idle"), Math.random() * 1400);
        this.position = pos;
        this.scale.set(Math.random() * 0.3 + 0.85);
        this.z = pos.y / 10;
        ;
        ;
    }
}
exports.TreeView = TreeView;
