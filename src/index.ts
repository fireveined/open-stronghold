import 'reflect-metadata';
import * as PIXI from "pixi.js"
PIXI;
import "./utils/emitterAsync"

import { Game } from './game';
import { HelloStage } from './stages/hello/stage';
import { PlayStage } from './stages/play/stage';

window.onload = () => {
    let game = new Game();
    game.addStage(HelloStage, 'hello');
    game.addStage(PlayStage, 'play');
    game.run('hello');
};
