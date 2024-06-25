import {NetworkSystemComponent} from "@/core/gameNetwork";
import { InputSystemComponent } from "./gameInput";
import { RendererSystemComponent } from "./gameRenderer";
import { addItemToState, clearGameState, state, store } from "./gameState";
import { type Entity } from "./models/entity";

export let networkSystemComponent: NetworkSystemComponent
export let inputSystemComponent: InputSystemComponent
export let rendererSystemComponent: RendererSystemComponent
export const gameState = state

export function initGame(){
    networkSystemComponent = new NetworkSystemComponent()
    networkSystemComponent.initConnection()
    inputSystemComponent = new InputSystemComponent()
    document.addEventListener('canvas-ready', async (event: any) => {
        rendererSystemComponent = new RendererSystemComponent()
        clearGameState()
        await rendererSystemComponent.Init()
        document.addEventListener('state-update', (event: any) => {
            clearGameState()
            const items: Entity[] = JSON.parse(event.detail)
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                addItemToState(element)
            }
        })
    })
}