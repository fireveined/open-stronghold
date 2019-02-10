import { Resource } from '../base/loader/loader';

export const Resources = {
    TILESET: <Resource>{url: 'data/tileset.json'},
    TREES: <Resource>{url: 'data/trees.json'},
    ARCHER: <Resource>{url: 'data/archer/archer.json'},
    SPEARMAN: <Resource>{url: 'data/archer/spearman.json'},
    DEER: <Resource>{url: 'data/deer/deer.json'},
    BUILDINGS: <Resource>{url: 'data/buildings.json'},
    UI: <Resource>{url: 'data/ui/ui.json'},
};


declare module "pixi.js" {
    interface PIXI {
        TextureCache: { [key: string]: PIXI.Text };
    }
}