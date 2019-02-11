"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perform_ecs_1 = require("perform-ecs");
const ViewComp_1 = require("../renderable/ViewComp");
const WandererComp_1 = require("./WandererComp");
const WalkableComp_1 = require("../walkable/WalkableComp");
const StateComp_1 = require("../state/StateComp");
class WandererProcessor extends perform_ecs_1.System {
    constructor() {
        super(...arguments);
        this.view = perform_ecs_1.EntityViewFactory.createView({
            components: [WandererComp_1.WandererComp, ViewComp_1.AnimatedViewComp, WalkableComp_1.WalkableComp, StateComp_1.StateComp]
        });
    }
    update() {
        const now = Date.now();
        for (const entity of this.view.entities) {
            if (now > entity.changeWanderingTimestamp) {
                entity.changeWanderingTimestamp = now + 2500 + Math.random() * 1000;
                if (entity.currentlyWandering) {
                    entity.currentlyWandering = false;
                    entity.targetX = entity.x;
                    entity.targetY = entity.y;
                    entity.removeByType(this);
                    continue;
                }
                if (entity.canPush(entity.wandererCompPriority)) {
                    let stateData;
                    stateData = {
                        type: this,
                        priority: entity.wandererCompPriority,
                        onPause: () => {
                            entity.remove(stateData);
                            entity.currentlyWandering = false;
                            entity.targetX = entity.x;
                            entity.targetY = entity.y;
                            entity.changeWanderingTimestamp = now + 2500 + Math.random() * 1000;
                        },
                        onResume: () => {
                        }
                    };
                    entity.push(stateData);
                    entity.currentlyWandering = true;
                    entity.animator.runAnimation("walk");
                    entity.targetX = entity.x + Math.random() * 1000 - 500;
                    entity.targetY = entity.y + Math.random() * 1000 - 500;
                }
            }
        }
    }
}
exports.WandererProcessor = WandererProcessor;
