export class RendererToTexture {

    constructor(private pixiRenderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {

    }

    public render(obj: PIXI.DisplayObject, texture: PIXI.RenderTexture, clear?: boolean) {
        this.pixiRenderer.render(obj, texture, clear);
    }
}