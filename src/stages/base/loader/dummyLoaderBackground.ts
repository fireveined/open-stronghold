import { ILoaderBackground } from './loaderBackground';

export class DummyLoaderBackground implements ILoaderBackground {
    private stage!: PIXI.Container;


    constructor() {
    }
    public setup() {
    }

    public update(loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) {
    }

    public remove() {
        return Promise.resolve();
    }
}