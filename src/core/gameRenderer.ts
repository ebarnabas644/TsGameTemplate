import * as PIXI from 'pixi.js'
import { Graphics, Application, Assets, Sprite } from 'pixi.js'
import { getGameState } from './gameState'
import type { Entity } from './models/entity'
import { Viewport } from 'pixi-viewport'

export class RendererSystemComponent {
    public pixiApp: Application
    private viewport: Viewport
    public renderDictionary: Map<string, PIXI.Container>
    private followSet = false
    private playedId = ""
    constructor() {
        console.log("init renderer")
        this.pixiApp = new Application()
        this.renderDictionary = new Map<string, PIXI.Graphics | PIXI.Sprite>
    }

    async Init(){
        await this.pixiApp.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x5c812f,
        })

        document.addEventListener('playerCreated', (event: any) => {

        })

        const canvasLocation = document.getElementById('pixiContainer')
        if (canvasLocation) {
                canvasLocation.appendChild(this.pixiApp.canvas)
                console.log("Canvas location found")
        }

        this.viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 10000,
            worldHeight: 10000,
            events: this.pixiApp.renderer.events
        })

        this.viewport.clamp({
            left: 0,
            right: 10000,
            bottom: 10000,
            top: 0
        })

        this.pixiApp.stage.addChild(this.viewport)

        globalThis.__PIXI_APP__ = this.pixiApp;

        // Load the bunny texture
        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

        // Create a bunny Sprite
        const bunny = new Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.x = 50
        bunny.y = 50
        this.viewport.addChild(bunny)

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

    setFollow(id: string){
        this.playedId = id
    }

    updateRendering(items: Entity[]){
        if(!this.followSet){
            const toFollow = this.renderDictionary.get(this.playedId)
            if(toFollow !== undefined){
                this.viewport.follow(toFollow as PIXI.Container)
                console.log("Follow set to:" + this.playedId)
                this.followSet = true
            }

        }
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
        rect.rect(0, 0, 100, 100)
        rect.fill(0xde3249)
        rect.pivot.set(50, 50)
        this.renderDictionary.set(id, rect)
        this.viewport.addChild(rect)
        console.log("New rect added")
    }
}