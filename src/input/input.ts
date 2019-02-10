import { Mouse } from './mouse';
import { Keyboaard, Keycodes } from './keyboard';
export { Keycodes };
export class Input {
    keyboard!: Keyboaard;
    mouse!: Mouse;
    
    public init() {
        this.keyboard = new Keyboaard();
        this.mouse = new Mouse();
    }
}

export var input = new Input();