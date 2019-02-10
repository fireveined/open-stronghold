import { ecs } from '../../../../../engine/ECS';

export interface IStateData {
    type: any;
    priority: number;
    onPause: Function;
    onResume: Function;
}


export class StateCompData {

    private stack: IStateData[];

    constructor() {
        this.stack = [];
        this.push = StateCompData.prototype.push;
        this.remove = StateCompData.prototype.remove;
        this.removeByType = StateCompData.prototype.removeByType;
        this.canPush = StateCompData.prototype.canPush;
    }

    public push(state: IStateData): void {
        const last = this.stack[this.stack.length - 1];
        if (last) {
            last.onPause();
        }
        this.stack.push(state);
        state.onResume();
    }


    public canPush(priority: number): boolean {
        const last = this.stack[this.stack.length - 1];
        return last.priority <= priority;
    }

    public remove(state: IStateData): void {
        const index = this.stack.indexOf(state);
        const elem = this.stack[index];

        this.stack.splice(index, 1);
        const stackLen = this.stack.length
        if (index === stackLen) {
            this.stack[stackLen - 1].onResume();
        }
    }

    public removeByType(type: any): void {
        const index = this.stack.findIndex((state) => state.type === type);
        this.stack.splice(index, 1);
        const stackLen = this.stack.length
        if (index === stackLen) {
            this.stack[stackLen - 1].onResume();
        }
    }
}


export const StateComp = ecs.registerComponent(StateCompData);