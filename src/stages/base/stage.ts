import { Service } from 'typedi';

import { IGameWindow } from '../../window';
import { StageChanger } from '../stageManager';
import { ResourceMap } from './loader/loader';

export interface IStageConstructor {
    resources: ResourceMap;
    new(GameWindow: IGameWindow, stageChanger: StageChanger): Stage;
}

@Service()
export abstract class Stage {
    protected pixiStage: PIXI.Container;
    protected stage: PIXI.Container;
    protected gameWindow: IGameWindow;
    protected stageChanger: StageChanger;

    protected abstract onUpdate(delta?: number): void;
    protected abstract onRemove(): void;
    protected abstract onInit(data?: any): void;

    constructor(gameWindow: IGameWindow, stageChanger: StageChanger) {
        this.stageChanger = stageChanger;
        this.gameWindow = gameWindow;
        this.pixiStage = gameWindow.getPixiStage();
        this.stage = new PIXI.Container();
        this.pixiStage.addChild(this.stage);
    }

    public update(delta: number) {
        this.onUpdate(delta);
    }

    public init(data?: any) {
        this.onInit(data);
    }

    public remove(): void {
        this.onRemove();
        this.pixiStage.removeChild(this.stage)
    }
}