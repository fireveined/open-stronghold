"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rectAtlas_1 = require("../../../utils/rectAtlas");
const loaderBackground_1 = require("./loaderBackground");
class PreLoader {
    constructor(background = new loaderBackground_1.DummyLoaderBackground()) {
        this.background = background;
        this.resourceMaps = [];
    }
    add(resources) {
        this.resourceMaps.push(resources);
    }
    attachLoadedFilesToResourceMaps() {
        for (let map of this.resourceMaps) {
            for (let resource in map) {
                let res = map[resource];
                res.loaded = PIXI.loader.resources[resource];
                if (res.generateAtlas) {
                    rectAtlas_1.generateRectTexturesOf(res.loaded, res.generateAtlas.frameWidth, res.generateAtlas.frameHeight);
                }
            }
        }
    }
    load() {
        return new Promise((resolve, reject) => {
            this.background.setup();
            for (let map of this.resourceMaps)
                for (let resource in map)
                    PIXI.loader.add(resource, map[resource].url);
            PIXI.loader.on("progress", this.background.update.bind(this.background))
                .load(() => {
                this.attachLoadedFilesToResourceMaps();
                this.background.remove()
                    .then(resolve);
            });
        });
    }
}
exports.PreLoader = PreLoader;
