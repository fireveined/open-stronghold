import { EntityViewFactory, System, SystemEntityType } from "perform-ecs"
import { DefaultStateComp } from "./DefaultStateComp";
import { StateComp } from "./StateComp";
import { AnimatedViewComp } from "../renderable/ViewComp";

export class DefaultStateProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [DefaultStateComp, StateComp, AnimatedViewComp],
        onEntityAdded: this.onEntityAdded.bind(this)
    })


    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        entity.push({
            type: DefaultStateComp,
            priority: -1,
            onPause: () => {
            },
            onResume: () => entity.animator.runAnimation(entity.defaultAnimation)
        });

        entity.animator.runAnimation(entity.defaultAnimation);
    }

    public update() {
    }
}


