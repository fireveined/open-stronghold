"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionComp_1 = require("../components/PositionComp");
const ViewComp_1 = require("../components/renderable/ViewComp");
const WandererComp_1 = require("../components/wanderer/WandererComp");
const WalkableComp_1 = require("../components/walkable/WalkableComp");
const StateComp_1 = require("../components/state/StateComp");
const DefaultStateComp_1 = require("../components/state/DefaultStateComp");
const ShootingComp_1 = require("../components/shooting/ShootingComp");
const EventEmmiterComp_1 = require("../components/EventEmmiterComp");
const MisslesColliderComp_1 = require("../components/misslesCollider/MisslesColliderComp");
const HPBarComp_1 = require("../components/damagable/HPBarComp");
const DamagableComp_1 = require("../components/damagable/DamagableComp");
const FadeOnDeathComp_1 = require("../components/deathBehaviour/FadeOnDeathComp");
const MeleeFigherComp_1 = require("../components/meele/MeleeFigherComp");
function createAnimConfig(config) {
    return {
        name: config.animName,
        textureName: (frameNumber, direction) => `${config.objectName}_${config.animName}_${direction}_${frameNumber}.png`,
        numFrames: config.numFrames || 16,
        FPS: config.FPS || 16,
        allDirections: config.allDirections,
        loop: config.loop,
        pingPong: config.pingPong
    };
}
const runAnim = (name) => createAnimConfig({
    animName: "run",
    objectName: name,
    allDirections: true,
    loop: true
});
const walkAnim = (name) => createAnimConfig({
    animName: "walk",
    objectName: name,
    allDirections: true,
    loop: true
});
const idleAnim = (name) => createAnimConfig({
    animName: "idle",
    objectName: name,
    allDirections: false,
    loop: true,
    FPS: 8,
    pingPong: true
});
const shootDeathAnim = (name) => createAnimConfig({
    animName: "shot_death",
    objectName: name,
    allDirections: false,
    FPS: 20,
    numFrames: 24
});
const meleeDeathAnim = (name) => createAnimConfig({
    animName: "melee_death",
    objectName: name,
    allDirections: false,
    FPS: 20,
    numFrames: 24
});
const meleeFightAnim = (name, frames = 12) => createAnimConfig({
    animName: "melee_fight",
    objectName: name,
    allDirections: true,
    FPS: 10,
    numFrames: frames,
    loop: true
});
const shootAnim = (name) => createAnimConfig({
    animName: "shot",
    objectName: name,
    allDirections: true,
    FPS: 8,
    numFrames: 24
});
function Archer(atlas, name) {
    return [
        { component: EventEmmiterComp_1.EventEmmiterComp },
        { component: MisslesColliderComp_1.MisslesColliderComp },
        { component: StateComp_1.StateComp },
        { component: DamagableComp_1.DamagableComp },
        { component: PositionComp_1.PositionComp },
        {
            component: ViewComp_1.AnimatedViewComp, args: [atlas,
                [runAnim(name), idleAnim(name), shootAnim(name), shootDeathAnim(name), meleeFightAnim(name, 8), meleeDeathAnim(name)]]
        },
        { component: DefaultStateComp_1.DefaultStateComp, args: ["idle"] },
        { component: WandererComp_1.WandererComp },
        { component: ShootingComp_1.ShootingComp },
        { component: HPBarComp_1.HPBarComp },
        { component: FadeOnDeathComp_1.FadeOnDeathComp },
        { component: MeleeFigherComp_1.MeleeFighterComp }
    ];
}
exports.Archer = Archer;
function Spearman(atlas, name) {
    return [
        { component: EventEmmiterComp_1.EventEmmiterComp },
        { component: MisslesColliderComp_1.MisslesColliderComp },
        { component: StateComp_1.StateComp },
        { component: DamagableComp_1.DamagableComp },
        { component: PositionComp_1.PositionComp },
        {
            component: ViewComp_1.AnimatedViewComp,
            args: [atlas, [walkAnim(name), idleAnim(name), shootDeathAnim(name), meleeFightAnim(name, 12), meleeDeathAnim(name)]]
        },
        { component: DefaultStateComp_1.DefaultStateComp, args: ["idle"] },
        { component: WandererComp_1.WandererComp },
        { component: WalkableComp_1.WalkableComp },
        { component: HPBarComp_1.HPBarComp },
        { component: FadeOnDeathComp_1.FadeOnDeathComp },
        { component: MeleeFigherComp_1.MeleeFighterComp }
    ];
}
exports.Spearman = Spearman;
