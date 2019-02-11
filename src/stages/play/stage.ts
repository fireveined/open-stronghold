import { Service } from 'typedi';

import { Stage as BaseStage } from '../base/stage';
import { Resources } from './resources';
import { TileMapFactory } from './map/TileMapFactory';
import { TileMapLoader } from './map/TileMapLoader';
import { DirtViewFactory } from './map/tiles/types/TileTypeDirt';
import { GrassViewFactory } from './map/tiles/types/TileTypeGrass';
import { TreeViewFactory } from './map/tiles/types/TileTypeTree';
import { Camera } from '../../engine/camera/Camera';
import { filters } from 'pixi-sound';
import { StaticViewProcessor } from './objects/components/renderable/StaticViewProcessor';
import { AnimatedViewProcessor } from './objects/components/renderable/AnimatedViewProcessor';
import { WandererProcessor } from './objects/components/wanderer/WandererProcessor';
import { WalkableProcessor } from './objects/components/walkable/WalkableProcessor';
import { DefaultStateProcessor } from "./objects/components/state/DefaultStateProcessor";
import { ShootingProcessor } from "./objects/components/shooting/ShootingProcessor";
import { ShootableProcessor } from "./objects/components/shooting/ShootableProcessor";
import { Arrow } from "./objects/entities/Missle";
import { DamagableProcessor } from "./objects/components/damagable/DamagableProcessor";
import { HPBarProcessor } from "./objects/components/damagable/HPBarProcessor";
import { MisslesColliderProcessor } from "./objects/components/misslesCollider/MisslesColliderProcessor";
import { FadeOnDeathProcessor } from "./objects/components/deathBehaviour/FadeOnDeathProcessor";
import { MeleeFighterProcessor } from "./objects/components/meele/MeleeFighterProcessor";
import { ecs } from "../../engine/ecs";
import { Archer, Spearman } from "./objects/entities/Archer";


let archer;

@Service()
export class PlayStage extends BaseStage {
    static resources = Resources;

    public onInit() {
        let mapStage = new PIXI.Container();
        this.stage.addChild(mapStage);


        //staticViewProcessor.init(map);
        //animatedViewProcessor.init(map);
        ecs.registerSystem(new DefaultStateProcessor());
        const staticViewProcessor = ecs.registerSystem(new StaticViewProcessor());
        const animatedViewProcessor = ecs.registerSystem(new AnimatedViewProcessor());
        ecs.registerSystem(new WandererProcessor());
        ecs.registerSystem(new WalkableProcessor());
        const shootingSystem = ecs.registerSystem(new ShootingProcessor());

        ecs.registerSystem(new ShootableProcessor());
        ecs.registerSystem(new DamagableProcessor());
        ecs.registerSystem(new MisslesColliderProcessor());
        ecs.registerSystem(new HPBarProcessor());
        ecs.registerSystem(new FadeOnDeathProcessor());
        ecs.registerSystem(new MeleeFighterProcessor());
        console.log(ecs);
        const tileMapFactory = new TileMapFactory(new TileMapLoader(50, 80));
        animatedViewProcessor.init(tileMapFactory.tilePlacementStrateegy);
        staticViewProcessor.init(tileMapFactory.tilePlacementStrateegy);

        tileMapFactory.registerTileType(0, new GrassViewFactory(Resources.TILESET.loaded));
        tileMapFactory.registerTileType(1, new DirtViewFactory(Resources.TILESET.loaded));
        tileMapFactory.registerTileType(2, new TreeViewFactory(Resources.TREES.loaded, "oak"))
        tileMapFactory.registerTileType(3, new TreeViewFactory(Resources.TREES.loaded, "shurb1"))
        tileMapFactory.registerTileType(4, new TreeViewFactory(Resources.TREES.loaded, "shurb2"))

        const map = tileMapFactory.create();

        shootingSystem.init(() => {
            const arrow = ecs.createEntity(Arrow(Resources.ARCHER.loaded, "archer"));
            map.addChild(arrow.sprite);
            return arrow;
        })

        // for (let i = 0; i < 5; i++) {
        //     const deer = DeerEntityFactory.create(Resources.DEER.loaded, "deer");
        //     deer.x = 22 + i * 0.01;
        //     deer.y = 22 + i * 0.01;
        //     map.addChild(deer.sprite);
        // }
        //
        // for (let i = 0; i < 5; i++) {
        //     const deer = BuildingEntityFactory.create(Resources.BUILDINGS.loaded, "stone_wall");
        //     deer.x = 3 + i;
        //     deer.y = 10;
        //     map.addChild(deer.sprite);
        // }
        for (let i = 0; i < 65; i++) {
            const archer = ecs.createEntity(Archer(Resources.ARCHER.loaded, "archer"));
            archer.x = Math.random() * 42 + 8;
            archer.y = Math.random() * 35 + 4;
            map.addChild(archer.sprite);
        }

        for (let i = 0; i < 55; i++) {
            const archer = ecs.createEntity(Spearman(Resources.SPEARMAN.loaded, "spearman"));
            archer.x = Math.random() * 45 + 8;
            archer.y = Math.random() * 35 + 4;
            map.addChild(archer.sprite);
        }


        this.stage.addChild(map);


        const camera = new Camera({
            worldWidth: map.pixelWidth,
            worldHeight: map.pixelHeight,
            screenWidth: this.gameWindow.getWidth(),
            screenHeight: this.gameWindow.getHeight()
        });

        camera.attachTo(map);


    }

    public onUpdate(delta: number) {

    }

    public onRemove() {

    }

}