"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderToTexture_1 = require("./utils/renderToTexture");
require("pixi-tween");
const typedi_1 = require("typedi");
const fixedTimeLoop_1 = require("./fixedTimeLoop");
const loader_1 = require("./stages/base/loader");
const stageManager_1 = require("./stages/stageManager");
const sfx_1 = require("./utils/sfx/sfx");
const window_1 = require("./window");
class Game {
    constructor() {
        let gameWindow = new window_1.GameWindow();
        let pixiStage = gameWindow.getPixiStage();
        typedi_1.Container.set(sfx_1.SFX, new sfx_1.SFX());
        typedi_1.Container.set(renderToTexture_1.RendererToTexture, new renderToTexture_1.RendererToTexture(gameWindow.getRenderer()));
        this.stageManager = new stageManager_1.StageManager(gameWindow);
        this.preloader = new loader_1.PreLoader(new loader_1.BasicLoaderBackground(gameWindow));
    }
    update(delta) {
        this.stageManager.updateCurrentStage(delta);
    }
    addStage(stage, name) {
        this.stageManager.add(stage, name);
        this.preloader.add(stage.resources);
    }
    run(name) {
        return __awaiter(this, void 0, void 0, function* () {
            Game.loop = new fixedTimeLoop_1.FixedTimeLoop({
                callback: this.update.bind(this),
                targetFPS: 50
            });
            yield this.preloader.load();
            this.stageManager.start(name);
        });
    }
}
exports.Game = Game;
