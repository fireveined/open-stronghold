"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var StateComp_1;
"use strict";
const perform_ecs_1 = require("perform-ecs");
let StateComp = StateComp_1 = class StateComp extends perform_ecs_1.Component {
    reset(obj) {
        obj.stack = [];
        obj.push = StateComp_1.prototype.push;
        obj.remove = StateComp_1.prototype.remove;
        obj.removeByType = StateComp_1.prototype.removeByType;
        obj.canPush = StateComp_1.prototype.canPush;
    }
    push(state) {
        const last = this.stack[this.stack.length - 1];
        if (last) {
            last.onPause();
        }
        this.stack.push(state);
        state.onResume();
    }
    canPush(priority) {
        const last = this.stack[this.stack.length - 1];
        return last.priority <= priority;
    }
    remove(state) {
        const index = this.stack.indexOf(state);
        const elem = this.stack[index];
        this.stack.splice(index, 1);
        const stackLen = this.stack.length;
        if (index === stackLen) {
            this.stack[stackLen - 1].onResume();
        }
    }
    removeByType(type) {
        const index = this.stack.findIndex((state) => state.type === type);
        this.stack.splice(index, 1);
        const stackLen = this.stack.length;
        if (index === stackLen) {
            this.stack[stackLen - 1].onResume();
        }
    }
};
StateComp = StateComp_1 = __decorate([
    perform_ecs_1.makeComponent
], StateComp);
exports.StateComp = StateComp;
