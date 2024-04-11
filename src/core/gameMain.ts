import {NetworkSystemComponent} from "@/core/gameNetwork";
import { InputSystemComponent } from "./gameInput";

export let networkSystemComponent: NetworkSystemComponent
export let inputSystemComponent: InputSystemComponent

export function initGame(){
    networkSystemComponent = new NetworkSystemComponent()
    networkSystemComponent.initConnection()
    inputSystemComponent = new InputSystemComponent()
}