import { IGameWindow } from '../../../window';
import { ILoaderBackground } from './loaderBackground';


export class BasicLoaderBackground implements ILoaderBackground {
    private stage!: PIXI.Container;
    private parent: PIXI.Container;
    private gameWindow: IGameWindow;
    private loadingText!: PIXI.Text;
    private progressText!: PIXI.Text;

    constructor(gameWindow: IGameWindow) {
        this.parent = gameWindow.getPixiStage();
        this.gameWindow = gameWindow;
    }

    public setup() {
        this.stage = new PIXI.Container();
        this.parent.addChild(this.stage);


        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 40,
            fill: "white"
        });

        this.loadingText = new PIXI.Text("Loading...", style);
        this.loadingText.position.x = this.gameWindow.getWidth() / 2;
        this.loadingText.position.y = this.gameWindow.getHeight() * 0.4;
        this.loadingText.anchor.set(0.5, 0.5);
        this.stage.addChild(this.loadingText);

        style = Object.assign({}, style);
        style.fontSize = 23;
        this.progressText = new PIXI.Text("", style);
        this.progressText.position.x = this.gameWindow.getWidth() / 2;
        this.progressText.position.y = this.loadingText.getBounds().bottom + 20;
        this.progressText.anchor.set(0.5, 0.5);
        this.stage.addChild(this.progressText);
    }

    public update(loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) {
        this.progressText.text = resource.url;
    }

    public remove() {
        this.progressText.text = "100%";

        let tween = PIXI.tweenManager.createTween(this.stage)
            .from({ alpha: 1 })
            .to({ alpha: 0 })
        tween.time = 2000;
        tween.start();

        return new Promise<void>(resolve => {
            tween.once("end", () => {
                resolve();
                this.parent.removeChild(this.stage);
            });

        })
    }
}