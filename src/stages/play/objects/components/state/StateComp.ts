import { Component,makeComponent } from "perform-ecs"

export interface IStateData {
    type: any;
    priority: number;
    onPause: Function;
    onResume: Function;
}

@makeComponent
export class StateComp extends Component {

    private stack: IStateData[];

    public reset(obj: StateComp) {
        obj.stack = [];
        obj.push = StateComp.prototype.push;
        obj.remove = StateComp.prototype.remove;
        obj.removeByType = StateComp.prototype.removeByType;
        obj.canPush = StateComp.prototype.canPush;
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


