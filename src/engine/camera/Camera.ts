import Viewport = require('pixi-viewport');


interface ViewportOptions {
    screenWidth: number;
    screenHeight: number;
    worldWidth: number;
    worldHeight: number;
}

export class Camera {
    private _viewport: Viewport;

    constructor(viewport: ViewportOptions) {
        this._viewport = new Viewport(viewport);
        this._viewport.drag().wheel().clamp().clampZoom({
            minWidth: viewport.screenWidth * 0.75,
            minHeight: viewport.screenHeight * 0.75,
            maxWidth: viewport.worldWidth,
            maxHeight: viewport.worldHeight
        });


        this._viewport.pausePlugin("clamp-zoom")
        this._viewport.on("moved", ()=>{
            this._viewport.x = Math.round(this._viewport.x);
            this._viewport.y = Math.round(this._viewport.y);
        })
    }

    public attachTo(container: PIXI.Container): void {
        const index = container.parent.getChildIndex(container);
        container.parent.addChildAt(this._viewport as any, index);
        this._viewport.addChild(container);
    }
}