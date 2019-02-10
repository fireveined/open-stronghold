import { Component } from './Component';

export type ComponentsHash = string;

export function getComponentsHash(components: { id: number }[]): ComponentsHash {
    let hash = "";
    for (const component of components) {
        hash += component.id;
    }
    return hash;
}