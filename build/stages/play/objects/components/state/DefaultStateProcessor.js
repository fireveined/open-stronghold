"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const DefaultStateComp_1 = require("./DefaultStateComp");
const StateComp_1 = require("./StateComp");
const ViewComp_1 = require("../renderable/ViewComp");
class DefaultStateProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [DefaultStateComp_1.DefaultStateComp, StateComp_1.StateComp, ViewComp_1.AnimatedViewComp],
            onEntityAdded: this.onEntityAdded.bind(this)
        });
    }
    onEntityAdded(entity) {
        entity.push({
            type: DefaultStateComp_1.DefaultStateComp,
            priority: -1,
            onPause: () => {
            },
            onResume: () => entity.animator.runAnimation(entity.defaultAnimation)
        });
        entity.animator.runAnimation(entity.defaultAnimation);
    }
    update() {
    }
}
exports.DefaultStateProcessor = DefaultStateProcessor;
