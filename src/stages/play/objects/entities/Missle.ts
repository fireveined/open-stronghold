import { ecs } from '../../../../engine/ECS';
import { PositionComp } from '../components/PositionComp';
import { StaticViewComp } from '../components/renderable/ViewComp';
import { ShootableComp } from "../components/shooting/ShootableComp";
import { EventEmmiterComp } from "../components/EventEmmiterComp";
import { FadeOnDeathComp } from "../components/deathBehaviour/FadeOnDeathComp";
import { ComponentInitializator } from "perform-ecs"

export function Arrow(atlas: PIXI.loaders.Resource, name: string): ComponentInitializator[] {
    return [
        {component: EventEmmiterComp},
        {component: PositionComp},
        {component: StaticViewComp, args: [atlas, "arrow"]},
        {component: ShootableComp},
        {component: FadeOnDeathComp}
    ];

}
