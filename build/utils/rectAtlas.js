"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRectTexturesOf(resource, frameWidth, frameHeight) {
    let width = resource.texture.width;
    let height = resource.texture.height;
    let framesX = width / frameWidth;
    let framesY = height / frameHeight;
    if (!resource.textures)
        resource.textures = {};
    let frameNum = 0;
    for (let x = 0; x < framesX; x++)
        for (let y = 0; y < framesY; y++) {
            let frame = new PIXI.Rectangle(x * frameWidth, y * frameHeight, frameWidth, frameHeight);
            resource.textures[frameNum] = new PIXI.Texture(resource.texture.baseTexture, frame);
            frameNum++;
        }
}
exports.generateRectTexturesOf = generateRectTexturesOf;
