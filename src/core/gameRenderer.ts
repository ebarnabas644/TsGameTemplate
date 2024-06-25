import * as PIXI from 'pixi.js'
import { Graphics, Application, Assets, Sprite } from 'pixi.js'
import { getGameState } from './gameState'
import type { Entity } from './models/entity'

export class RendererSystemComponent {
    public pixiApp: Application

    constructor() {
        console.log("init renderer")
        this.pixiApp = new Application()
    }

    async Init(){
        await this.pixiApp.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x5c812f
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
                const rect = new Graphics()
                rect.rect(item.Position.X, item.Position.Y, 100, 100)
                rect.fill(0xde3249)
                this.pixiApp.stage.addChild(rect)
                console.log("New rect added")
            })
            
        })
    }
}