import {NetworkSystemComponent} from "@/core/gameNetwork";
import { InputSystemComponent } from "./gameInput";
import { RendererSystemComponent } from "./gameRenderer";
import { addItemToState, clearGameState, getGameState, state, store, uiStore } from "./gameState";
import { type Entity } from "./models/entity";
import { UserInterfaceSystemComponent } from "./gameUserInterface";

export let networkSystemComponent: NetworkSystemComponent
export let inputSystemComponent: InputSystemComponent
export let rendererSystemComponent: RendererSystemComponent
export let userInterfaceSystemComponent: UserInterfaceSystemComponent
export const gameState = state

export function initGame(){
    document.addEventListener('canvas-ready', async (event: any) => {
        rendererSystemComponent = new RendererSystemComponent()
        userInterfaceSystemComponent = new UserInterfaceSystemComponent()
        clearGameState()
        await rendererSystemComponent.Init()
        document.addEventListener('state-update', (event: any) => {
            clearGameState()
            const items: Entity[] = JSON.parse(event.detail)
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                addItemToState(element)
            }
            rendererSystemComponent.updateRendering(getGameState())
            userInterfaceSystemComponent.updateUI(uiStore, items[0].Position.X, items[0].Position.Y)
        })
        networkSystemComponent = new NetworkSystemComponent()
        networkSystemComponent.initConnection()
        inputSystemComponent = new InputSystemComponent()
    })
}