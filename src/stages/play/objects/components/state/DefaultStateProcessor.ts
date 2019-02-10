import { System, RegisterGroupFunction } from '../../../../../ecs/SystemFactory';
import { Entity } from '../../../../../ecs/Entity';
import { PositionComp, Position } from '../PositionComp';
import { TileViewPlacementStrategy } from "../../../map/tiles/TileViewPlacementStrategy";
import { DefaultStateComp, DefaultStateCompData } from "./DefaultStateComp";
import { StateComp, StateCompData } from "./StateComp";
import { AnimatedView, AnimatedViewComp } from "../renderable/ViewComp";

type DefaultStateEntity = Entity & DefaultStateCompData & StateCompData & AnimatedView;

export class DefaultStateProcessor implements System<DefaultStateEntity> {

    private _entities: DefaultStateEntity[];


    public registerGroup(registerFunc: RegisterGroupFunction<DefaultStateEntity>) {
        this._entities = registerFunc([DefaultStateComp, StateComp, AnimatedViewComp]);
    }

    public onEntityAdded(entity: DefaultStateEntity): void {
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


