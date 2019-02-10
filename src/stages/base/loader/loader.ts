import { generateRectTexturesOf } from '../../../utils/rectAtlas';
import { DummyLoaderBackground, ILoaderBackground } from './loaderBackground';

interface GenerateAtlasConfig {
    frameWidth: number;
    frameHeight: number;
}

export interface Resource {
    url: string;
    loaded: PIXI.loaders.Resource;
    generateAtlas?: GenerateAtlasConfig;
}
export declare type ResourceMap = { [name: string]: Resource };

export class PreLoader {
    private background: ILoaderBackground;
    private resourceMaps: ResourceMap[];

    constructor(background: ILoaderBackground = new DummyLoaderBackground()) {
        this.background = background;
        this.resourceMaps = [];
    }

    public add(resources: ResourceMap) {
        this.resourceMaps.push(resources);
    }

    private attachLoadedFilesToResourceMaps() {
        for (let map of this.resourceMaps) {
            for (let resource in map) {
                let res = map[resource];
                res.loaded = PIXI.loader.resources[resource];

                if (res.generateAtlas) {
                    generateRectTexturesOf(res.loaded, res.generateAtlas.frameWidth, res.generateAtlas.frameHeight);
                }
            }
        }
    }

    public load() {
        return new Promise<void>((resolve, reject) => {
            this.background.setup();

            for (let map of this.resourceMaps)
                for (let resource in map)
                    PIXI.loader.add(resource, map[resource].url);

            PIXI.loader.on("progress", this.background.update.bind(this.background))
                .load(() => {
                    this.attachLoadedFilesToResourceMaps();
                    this.background.remove()
                        .then(resolve);
                })
        })
    }
}