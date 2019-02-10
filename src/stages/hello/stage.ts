import { Container } from 'typedi';
import { Stage as BaseStage } from '../base/stage';
import { input, Keycodes } from '../../input/input';
import { SFX } from '../../utils/sfx/sfx';
import { TextBlinker } from '../../utils/textBlinker';
import { Resources } from './resources';


export class HelloStage extends BaseStage {
    static resources = Resources;

    public onInit() {

        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 20,
            fill: "white"
        });
        let text = new PIXI.Text("Press space to start...", style);
        text.position.x = 400
        text.position.y = 500;
        text.anchor.set(0.5, 0.5);
        this.stage.addChild(text);
        new TextBlinker(text);
        this.openGame();
        //input.keyboard.onceDown(Keycodes.KEY_SPACE, this.openGame.bind(this));
    }

    public onUpdate() {

    }

    public openGame() {

        this.stageChanger.start("play");
    }

    public onRemove() {

    }

}