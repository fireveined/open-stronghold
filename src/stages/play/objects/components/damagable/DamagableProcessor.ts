import { System, EntityViewFactory, SystemEntityType } from "perform-ecs"
import { AnimatedViewComp } from '../renderable/ViewComp';
import { DamagableComp, EntityDeathEvent, EntityDeathType } from "./DamagableComp";
import { StateComp } from "../state/StateComp";
import { EventEmmiterComp } from "../EventEmmiterComp";
import { ShootableComp } from "../shooting/ShootableComp";

export class DamagableProcessor extends System {

   public entities = EntityViewFactory.createView({
       components: [DamagableComp, StateComp, EventEmmiterComp, AnimatedViewComp],
       onEntityAdded: this.onEntityAdded.bind(this)
   })




    public onEntityAdded(entity: SystemEntityType<this, "entities">): void {
        entity.events.on("shoot", (missle: ShootableComp) => {
            entity.currentHP -= missle.hitDamage;

            if (entity.currentHP <= 0) {
                entity.push({
                    priority: 9999,
                    type: this,
                    onPause: () => {
                    },
                    onResume: () => {
                    }
                });


                entity.isDead = true;
                entity.events.emitAsync(EntityDeathEvent, EntityDeathType.SHOT);
            }
        })

        entity.events.on("melee_attacked", (dmg: number) => {
            entity.currentHP -= dmg;

            if (entity.currentHP <= 0) {
                entity.push({
                    priority: 9999,
                    type: this,
                    onPause: () => {
                    },
                    onResume: () => {
                    }
                });


                entity.isDead = true;
                entity.events.emitAsync(EntityDeathEvent, EntityDeathType.MEELE);
            }
        })
    }


    public update(delta: number) {

    }
}