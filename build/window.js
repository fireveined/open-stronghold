"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input/input");
class GameWindow {
    constructor() {
        this._resolutionMultipler = 0.7;
        let width = window.innerWidth;
        let height = window.innerHeight;
        this._app = new PIXI.Application({
            width: width,
            height: height
        });
        this.resize();
        this.appendToContainer();
        window.addEventListener("resize", () => this.resize());
        input_1.input.init();
        const gl = this._app.renderer;
        gl.state.setDepthTest(1);
        gl.gl.depthFunc(gl.gl.GREATER);
        gl.gl.depthMask(true);
        gl.gl.clearDepth(0);
    }
    _calculateScreenSize() {
        return new PIXI.Point(window.innerWidth * this._resolutionMultipler, (window.innerHeight - 1) * this._resolutionMultipler);
    }
    resize() {
        const size = this._calculateScreenSize();
        this._app.renderer.resize(size.x, size.y);
        this._app.view.style.width = "100%";
        this._app.view.style.height = "100%";
    }
    getPixiStage() {
        return this._app.stage;
    }
    getWidth() {
        return this._app.screen.width;
    }
    getHeight() {
        return this._app.screen.height;
    }
    appendToContainer() {
        let gameContainer = document.getElementById('game-container');
        if (gameContainer)
            gameContainer.appendChild(this._app.view);
        else
            console.error("Can't find 'game-container'");
    }
    getRenderer() {
        return this._app.renderer;
    }
}
exports.GameWindow = GameWindow;
