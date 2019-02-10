import { SyncEvent } from 'ts-events';

export class Mouse {
    private x: number;
    private y: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.bind();
    }

    private bind() {
        document.getElementsByTagName('canvas')[0].addEventListener('mousemove', (event) => {
            this.x = event.offsetX;
            this.y = event.offsetY;
        })
    }

    public getX(){
        return this.x;
    }

    public getY(){
        return this.y;
    }
}
