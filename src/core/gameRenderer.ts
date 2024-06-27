import * as PIXI from 'pixi.js'
import { Graphics, Application, Assets, Sprite } from 'pixi.js'
import { getGameState } from './gameState'
import type { Entity } from './models/entity'

export class RendererSystemComponent {
    public pixiApp: Application
    public renderDictionary: Map<string, PIXI.Graphics | PIXI.Sprite>
    constructor() {
        console.log("init renderer")
        this.pixiApp = new Application()
        this.renderDictionary = new Map<string, PIXI.Graphics | PIXI.Sprite>
    }

    async Init(){
        await this.pixiApp.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x5c812f
        })

        document.addEventListener('playerCreated', (event: any) => {

        })

        const canvasLocation = document.getElementById('pixiContainer')
        if (canvasLocation) {
                canvasLocation.appendChild(this.pixiApp.canvas)
                console.log("Canvas location found")
        }

        globalThis.__PIXI_APP__ = this.pixiApp;
        const graphics = new Graphics()
        graphics.rect(50,50,100,100)
        graphics.fill(0xde3249)
        this.pixiApp.stage.addChild(graphics)

        // Load the bunny texture
        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

        // Create a bunny Sprite
        const bunny = new Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.x = 50
        bunny.y = 50
        this.pixiApp.stage.addChild(bunny)

        this.pixiApp.ticker.add(() => {
            
            const localState = getGameState()
            console.log(localState)
            /*for (let index = 0; index < localState.length; index++) {
                const element = localState[index];
                console.log(element)
            }*/
            localState.forEach((item: Entity) => {
                
            })
            
        })
    }

    updateRendering(items: Entity[]){
        items.forEach(item => {
            if(!this.renderDictionary.has(item.Id)){
                this.addNewPlayer(item.Id, item)
            }
            else{
                const entity = this.renderDictionary.get(item.Id)
                if(entity !== undefined){
                    entity.x = item.Position.X
                    entity.y = item.Position.Y
                }
            }
        });
        this.renderDictionary.forEach((value: any, key: string) =>{
            if(items.find(x => x.Id == key) === undefined){
                const itemToRemove = this.renderDictionary.get(key)
                itemToRemove?.destroy()
                this.renderDictionary.delete(key)
            }
        })
    }

    addNewPlayer(id: string, entity: Entity) {
        const rect = new Graphics()
        rect.rect(entity.Position.X, entity.Position.Y, 100, 100)
        rect.fill(0xde3249)
        this.renderDictionary.set(id, rect)
        this.pixiApp.stage.addChild(rect)
        console.log("New rect added")
    }
}