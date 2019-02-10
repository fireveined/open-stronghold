import { logger } from '../utils/logger';
import { IGameWindow } from '../window';
import { IStageConstructor, Stage } from './base/stage';

declare type StagesMap = { [name: string]: IStageConstructor };



export interface StageChanger {
    start(stageName: string, data?: any): void;
}

export class StageManager {
    private stages: StagesMap;
    private currentStage!: Stage;
    private gameWindow: IGameWindow;

    constructor(gameWindow: IGameWindow) {
        this.gameWindow = gameWindow;
        this.stages = {};
    }

    public updateCurrentStage(delta: number) {
        if (this.getCurrentStage())
            this.getCurrentStage().update(delta);
    }

    public add(stage: IStageConstructor, name: string) {
        this.stages[name] = stage;
    }

    public getCurrentStage() {
        return this.currentStage;
    }

    public start(stageName: string, data?: any) {
        if (this.currentStage)
            this.currentStage.remove();

        let newStage = this.stages[stageName];
        if (!newStage) {
            logger.error(`Can't find stage: ${stageName}`);
            return;
        }

        this.currentStage = new newStage(this.gameWindow, this);
        this.currentStage.init(data);
    }
}