"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
class StageManager {
    constructor(gameWindow) {
        this.gameWindow = gameWindow;
        this.stages = {};
    }
    updateCurrentStage(delta) {
        if (this.getCurrentStage())
            this.getCurrentStage().update(delta);
    }
    add(stage, name) {
        this.stages[name] = stage;
    }
    getCurrentStage() {
        return this.currentStage;
    }
    start(stageName, data) {
        if (this.currentStage)
            this.currentStage.remove();
        let newStage = this.stages[stageName];
        if (!newStage) {
            logger_1.logger.error(`Can't find stage: ${stageName}`);
            return;
        }
        this.currentStage = new newStage(this.gameWindow, this);
        this.currentStage.init(data);
    }
}
exports.StageManager = StageManager;
