import {NetworkSystemComponent} from "@/core/gameNetwork";
import { InputSystemComponent } from "./gameInput";
import { RendererSystemComponent } from "./gameRenderer";

export let networkSystemComponent: NetworkSystemComponent
export let inputSystemComponent: InputSystemComponent
export let rendererSystemComponent: RendererSystemComponent

export function initGame(){
    networkSystemComponent = new NetworkSystemComponent()
    networkSystemComponent.initConnection()
    inputSystemComponent = new InputSystemComponent()
    document.addEventListener('canvas-ready', async (event: any) => {
        rendererSystemComponent = new RendererSystemComponent()
        await rendererSystemComponent.Init()
    })
}