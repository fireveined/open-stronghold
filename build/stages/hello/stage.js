"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stage_1 = require("../base/stage");
const textBlinker_1 = require("../../utils/textBlinker");
const resources_1 = require("./resources");
class HelloStage extends stage_1.Stage {
    onInit() {
        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 20,
            fill: "white"
        });
        let text = new PIXI.Text("Press space to start...", style);
        text.position.x = 400;
        text.position.y = 500;
        text.anchor.set(0.5, 0.5);
        this.stage.addChild(text);
        new textBlinker_1.TextBlinker(text);
        this.openGame();
        //input.keyboard.onceDown(Keycodes.KEY_SPACE, this.openGame.bind(this));
    }
    onUpdate() {
    }
    openGame() {
        this.stageChanger.start("play");
    }
    onRemove() {
    }
}
HelloStage.resources = resources_1.Resources;
exports.HelloStage = HelloStage;
