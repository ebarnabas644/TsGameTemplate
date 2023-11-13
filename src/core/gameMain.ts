import {NetworkSystemComponent} from "@/core/gameNetwork";

export let networkSystemComponent: NetworkSystemComponent

export function initGame(){
    networkSystemComponent = new NetworkSystemComponent()
    networkSystemComponent.initConnection()
}