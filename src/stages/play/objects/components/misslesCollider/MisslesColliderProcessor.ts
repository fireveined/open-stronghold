import { EntityViewFactory, System, SystemEntityType } from "perform-ecs"
import { EventEmmiterComp } from "../EventEmmiterComp";
import { EntityDeathEvent } from "../damagable/DamagableComp";
import { MisslesColliderComp } from "./MisslesColliderComp";

export class MisslesColliderProcessor extends System {

    public view = EntityViewFactory.createView({
        components: [MisslesColliderComp, EventEmmiterComp]
    })


    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        entity.events.on(EntityDeathEvent, () => {
            this.ecs.removeComponentsFromEntity(entity, MisslesColliderComp);
        })
    }

    public update(): void {
    }
}


