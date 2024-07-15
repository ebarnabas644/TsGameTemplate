import type { Entity } from "./models/entity";

export let store: any;
export let state: Entity[]
export let uiStore: any;

export function setStore(storeToSet: any){
    store = storeToSet
}

export function setUIStore(storeToSet: any){
    uiStore = storeToSet
}

export function clearGameState(){
    state = []
}

export function addItemToState(item: Entity){
    state.push(item)
}

export function getGameState(){
    return state
}