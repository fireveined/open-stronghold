import { input } from "./input/input";

export interface IGameWindow {
    getPixiStage(): PIXI.Container;
    getWidth(): number;
    getHeight(): number;
}

export class GameWindow implements IGameWindow {
    private _app: PIXI.Application;
    private _resolutionMultipler: number = 0.7;

    constructor() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this._app = new PIXI.Application({
            width: width,
            height: height
        });
        this.resize()
        this.appendToContainer();

        window.addEventListener("resize", () => this.resize());

        input.init();
        const gl: PIXI.WebGLRenderer = this._app.renderer as any;
        gl.state.setDepthTest(1);
        gl.gl.depthFunc(gl.gl.GREATER)
        gl.gl.depthMask(true)
        gl.gl.clearDepth(0);

    }

    private _calculateScreenSize(): PIXI.Point {
        return new PIXI.Point(window.innerWidth * this._resolutionMultipler, (window.innerHeight - 1) * this._resolutionMultipler);
    }

    public resize(): void {
        const size = this._calculateScreenSize();
        this._app.renderer.resize(size.x, size.y);
        this._app.view.style.width = "100%";
        this._app.view.style.height = "100%";
    }

    public getPixiStage() {
        return this._app.stage;
    }

    public getWidth() {
        return this._app.screen.width;
    }

    public getHeight() {
        return this._app.screen.height;
    }

    private appendToContainer() {
        let gameContainer = document.getElementById('game-container');
        if (gameContainer)
            gameContainer.appendChild(this._app.view)
        else
            console.error("Can't find 'game-container'");
    }

    public getRenderer() {
        return this._app.renderer;
    }
}