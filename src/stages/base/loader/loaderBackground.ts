export { BasicLoaderBackground } from './basicLoaderBackground';
export { DummyLoaderBackground } from './dummyLoaderBackground';

export interface ILoaderBackground {
    setup(): void;
    update(loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource): void;
    remove(): Promise<void>;
}