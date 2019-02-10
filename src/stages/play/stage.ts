import { Container, Service } from 'typedi';

import { Stage as BaseStage } from '../base/stage';
import { Keycodes } from '../../input/input';
import { SFX } from '../../utils/sfx/sfx';
import { Resources } from './resources';
import { TileMapFactory } from './map/TileMapFactory';
import { TileMapLoader } from './map/TileMapLoader';
import { DirtViewFactory } from './map/tiles/types/TileTypeDirt';
import { GrassViewFactory } from './map/tiles/types/TileTypeGrass';
import { TreeViewFactory } from './map/tiles/types/TileTypeTree';
import { Camera } from '../../engine/camera/Camera';
import { Animal } from './objects/GameObject';
import { filters } from 'pixi-sound';
import { PlantEntityFactory } from './objects/entities/Plant';
import { ecs } from '../../engine/ECS';
import { StaticViewProcessor } from './objects/components/renderable/StaticViewProcessor';
import { AnimatedViewProcessor } from './objects/components/renderable/AnimatedViewProcessor';
import { DeerEntityFactory } from './objects/entities/Deer';
import { WandererProcessor } from './objects/components/wanderer/WandererProcessor';
import { WalkableProcessor } from './objects/components/walkable/WalkableProcessor';
import { BuildingEntityFactory } from './objects/entities/Bulding';
import { DefaultStateProcessor } from "./objects/components/state/DefaultStateProcessor";
import { ShootingProcessor } from "./objects/components/shooting/ShootingProcessor";
import { ArcherEntityFactory, SpearmanEntityFactory } from "./objects/entities/Archer";
import { ShootableProcessor } from "./objects/components/shooting/ShootableProcessor";
import { ArrowEntityFactory } from "./objects/entities/Missle";
import { DamagableProcessor } from "./objects/components/damagable/DamagableProcessor";
import { HPBarProcessor } from "./objects/components/damagable/HPBarProcessor";
import { MisslesColliderProcessor } from "./objects/components/misslesCollider/MisslesColliderProcessor";
import { FadeOnDeathComp } from "./objects/components/deathBehaviour/FadeOnDeathComp";
import { FadeOnDeathProcessor } from "./objects/components/deathBehaviour/FadeOnDeathProcessor";
import { MeleeFighterProcessor } from "./objects/components/meele/MeleeFighterProcessor";


let archer;

@Service()
export class PlayStage extends BaseStage {
    static resources = Resources;

    public onInit() {
        let mapStage = new PIXI.Container();
        this.stage.addChild(mapStage);



        //staticViewProcessor.init(map);
        //animatedViewProcessor.init(map);
        ecs.createSystem(DefaultStateProcessor);
        const staticViewProcessor = ecs.createSystem(StaticViewProcessor) as StaticViewProcessor;
        const animatedViewProcessor = ecs.createSystem(AnimatedViewProcessor) as AnimatedViewProcessor;
        ecs.createSystem(WandererProcessor);
        ecs.createSystem(WalkableProcessor);
        const shootingSystem = ecs.createSystem(ShootingProcessor) as ShootingProcessor;

        ecs.createSystem(ShootableProcessor);
        ecs.createSystem(DamagableProcessor);
        ecs.createSystem(MisslesColliderProcessor);
        ecs.createSystem(HPBarProcessor);
        ecs.createSystem(FadeOnDeathProcessor);
        ecs.createSystem(MeleeFighterProcessor);
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
            const arrow = ArrowEntityFactory.create(Resources.ARCHER.loaded, "archer");
            map.addChild(arrow.sprite);
            return arrow;
        })

        for (let i = 0; i < 5; i++) {
            const deer = DeerEntityFactory.create(Resources.DEER.loaded, "deer");
            deer.x = 22 + i * 0.01;
            deer.y = 22 + i * 0.01;
            map.addChild(deer.sprite);
        }

        for (let i = 0; i < 5; i++) {
            const deer = BuildingEntityFactory.create(Resources.BUILDINGS.loaded, "stone_wall");
            deer.x = 3 + i;
            deer.y = 10;
            map.addChild(deer.sprite);
        }
        for (let i = 0; i < 65; i++) {
            const archer = ArcherEntityFactory.create(Resources.ARCHER.loaded, "archer");
            archer.x = Math.random()*42 + 8;
            archer.y = Math.random()*35 + 4;
            map.addChild(archer.sprite);
        }

        for (let i = 0; i < 55; i++) {
            const archer = SpearmanEntityFactory.create(Resources.SPEARMAN.loaded, "spearman");
            archer.x = Math.random()*45 + 8;
            archer.y = Math.random()*35 + 4;
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