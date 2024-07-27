import {NetworkSystemComponent} from "@/core/gameNetwork";
import { InputSystemComponent } from "./gameInput";
import { RendererSystemComponent } from "./gameRenderer";
import { GameState } from "./gameState";
import { type Entity } from "./models/entity";
import { UserInterfaceSystemComponent } from "./gameUserInterface";

export let networkSystemComponent: NetworkSystemComponent
export let inputSystemComponent: InputSystemComponent
export let rendererSystemComponent: RendererSystemComponent
export let userInterfaceSystemComponent: UserInterfaceSystemComponent
export const gameState = new GameState()

export async function initGame(){
    document.addEventListener('canvas-ready', async (event: any) => {
        rendererSystemComponent = new RendererSystemComponent()
        userInterfaceSystemComponent = new UserInterfaceSystemComponent()
        gameState.clearGameState()
        await rendererSystemComponent.Init()
        document.addEventListener('state-update', async (event: any) => {
            gameState.clearGameState()
            const messageParsed = JSON.parse(event.detail)
            const items: Entity[] = messageParsed.Entities
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                gameState.addItemToState(element)
            }
            await rendererSystemComponent.updateRendering(gameState.getGameState())
            if(gameState.playerId !== ""){
                const player = items.find(x => x.Id == gameState.playerId)
                if(player !== undefined){
                    userInterfaceSystemComponent.updateUI(gameState.uiStore, player.Position.X, player.Position.Y)
                }
            }

        })
        document.addEventListener('playerReceived', async (event: any) => {
            const messageParsed: string = event.detail
            gameState.playerId = messageParsed
            console.log(gameState.playerId)
        })
        networkSystemComponent = new NetworkSystemComponent()
        networkSystemComponent.initConnection()
        inputSystemComponent = new InputSystemComponent()
    })
}