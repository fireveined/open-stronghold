"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const stage_1 = require("../base/stage");
const resources_1 = require("./resources");
const TileMapFactory_1 = require("./map/TileMapFactory");
const TileMapLoader_1 = require("./map/TileMapLoader");
const TileTypeDirt_1 = require("./map/tiles/types/TileTypeDirt");
const TileTypeGrass_1 = require("./map/tiles/types/TileTypeGrass");
const TileTypeTree_1 = require("./map/tiles/types/TileTypeTree");
const Camera_1 = require("../../engine/camera/Camera");
const StaticViewProcessor_1 = require("./objects/components/renderable/StaticViewProcessor");
const AnimatedViewProcessor_1 = require("./objects/components/renderable/AnimatedViewProcessor");
const WandererProcessor_1 = require("./objects/components/wanderer/WandererProcessor");
const WalkableProcessor_1 = require("./objects/components/walkable/WalkableProcessor");
const DefaultStateProcessor_1 = require("./objects/components/state/DefaultStateProcessor");
const ShootingProcessor_1 = require("./objects/components/shooting/ShootingProcessor");
const ShootableProcessor_1 = require("./objects/components/shooting/ShootableProcessor");
const Missle_1 = require("./objects/entities/Missle");
const DamagableProcessor_1 = require("./objects/components/damagable/DamagableProcessor");
const HPBarProcessor_1 = require("./objects/components/damagable/HPBarProcessor");
const MisslesColliderProcessor_1 = require("./objects/components/misslesCollider/MisslesColliderProcessor");
const FadeOnDeathProcessor_1 = require("./objects/components/deathBehaviour/FadeOnDeathProcessor");
const MeleeFighterProcessor_1 = require("./objects/components/meele/MeleeFighterProcessor");
const ecs_1 = require("../../engine/ecs");
const Archer_1 = require("./objects/entities/Archer");
let archer;
let PlayStage = class PlayStage extends stage_1.Stage {
    onInit() {
        let mapStage = new PIXI.Container();
        this.stage.addChild(mapStage);
        //staticViewProcessor.init(map);
        //animatedViewProcessor.init(map);
        ecs_1.ecs.registerSystem(new DefaultStateProcessor_1.DefaultStateProcessor());
        const staticViewProcessor = ecs_1.ecs.registerSystem(new StaticViewProcessor_1.StaticViewProcessor());
        const animatedViewProcessor = ecs_1.ecs.registerSystem(new AnimatedViewProcessor_1.AnimatedViewProcessor());
        ecs_1.ecs.registerSystem(new WandererProcessor_1.WandererProcessor());
        ecs_1.ecs.registerSystem(new WalkableProcessor_1.WalkableProcessor());
        const shootingSystem = ecs_1.ecs.registerSystem(new ShootingProcessor_1.ShootingProcessor());
        ecs_1.ecs.registerSystem(new ShootableProcessor_1.ShootableProcessor());
        ecs_1.ecs.registerSystem(new DamagableProcessor_1.DamagableProcessor());
        ecs_1.ecs.registerSystem(new MisslesColliderProcessor_1.MisslesColliderProcessor());
        ecs_1.ecs.registerSystem(new HPBarProcessor_1.HPBarProcessor());
        ecs_1.ecs.registerSystem(new FadeOnDeathProcessor_1.FadeOnDeathProcessor());
        ecs_1.ecs.registerSystem(new MeleeFighterProcessor_1.MeleeFighterProcessor());
        console.log(ecs_1.ecs);
        const tileMapFactory = new TileMapFactory_1.TileMapFactory(new TileMapLoader_1.TileMapLoader(50, 80));
        animatedViewProcessor.init(tileMapFactory.tilePlacementStrateegy);
        staticViewProcessor.init(tileMapFactory.tilePlacementStrateegy);
        tileMapFactory.registerTileType(0, new TileTypeGrass_1.GrassViewFactory(resources_1.Resources.TILESET.loaded));
        tileMapFactory.registerTileType(1, new TileTypeDirt_1.DirtViewFactory(resources_1.Resources.TILESET.loaded));
        tileMapFactory.registerTileType(2, new TileTypeTree_1.TreeViewFactory(resources_1.Resources.TREES.loaded, "oak"));
        tileMapFactory.registerTileType(3, new TileTypeTree_1.TreeViewFactory(resources_1.Resources.TREES.loaded, "shurb1"));
        tileMapFactory.registerTileType(4, new TileTypeTree_1.TreeViewFactory(resources_1.Resources.TREES.loaded, "shurb2"));
        const map = tileMapFactory.create();
        shootingSystem.init(() => {
            const arrow = ecs_1.ecs.createEntity(Missle_1.Arrow(resources_1.Resources.ARCHER.loaded, "archer"));
            map.addChild(arrow.sprite);
            return arrow;
        });
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
            const archer = ecs_1.ecs.createEntity(Archer_1.Archer(resources_1.Resources.ARCHER.loaded, "archer"));
            archer.x = Math.random() * 42 + 8;
            archer.y = Math.random() * 35 + 4;
            map.addChild(archer.sprite);
        }
        for (let i = 0; i < 55; i++) {
            const archer = ecs_1.ecs.createEntity(Archer_1.Spearman(resources_1.Resources.SPEARMAN.loaded, "spearman"));
            archer.x = Math.random() * 45 + 8;
            archer.y = Math.random() * 35 + 4;
            map.addChild(archer.sprite);
        }
        this.stage.addChild(map);
        const camera = new Camera_1.Camera({
            worldWidth: map.pixelWidth,
            worldHeight: map.pixelHeight,
            screenWidth: this.gameWindow.getWidth(),
            screenHeight: this.gameWindow.getHeight()
        });
        camera.attachTo(map);
    }
    onUpdate(delta) {
    }
    onRemove() {
    }
};
PlayStage.resources = resources_1.Resources;
PlayStage = __decorate([
    typedi_1.Service()
], PlayStage);
exports.PlayStage = PlayStage;
