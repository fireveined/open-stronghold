export class TextBlinker {


    constructor(text: PIXI.Text) {
        let id = setInterval(() => this.swap(text), 700);
        text.once('removed', () => clearInterval(id));
    }


    private swap(text: PIXI.Text) {
        text.visible = !text.visible;
    }
}
