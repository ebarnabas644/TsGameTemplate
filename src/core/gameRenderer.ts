import * as PIXI from 'pixi.js'
import { Graphics, Application, Assets, Sprite } from 'pixi.js'
import { getGameState } from './gameState'
import type { Entity } from './models/entity'
import { Viewport } from 'pixi-viewport'
import { TexturePool } from 'pixi.js'
import { GameAssetPathProvider } from './gameAssetPathProvider'

export class RendererSystemComponent {
    public pixiApp: Application
    private viewport: Viewport
    public renderDictionary: Map<string, PIXI.Container>
    private followSet = false
    private playedId = ""
    private playerSpriteSheet
    private assetPathProvider: GameAssetPathProvider
    constructor() {
        console.log("init renderer")
        this.pixiApp = new Application()
        this.renderDictionary = new Map<string, PIXI.Graphics | PIXI.Sprite>
        this.assetPathProvider = new GameAssetPathProvider("http://localhost:8080")
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

        this.viewport.zoom(0.2)

        this.viewport.clampZoom({
            minScale: 2,
            maxScale: 2
        }).clamp({
            left: 0,
            right: 10000,
            bottom: 10000,
            top: 0
        })

        this.pixiApp.stage.addChild(this.viewport)
        const mapTexture = await Assets.load(this.assetPathProvider.GetSpritePath("zefir.png"))
        mapTexture.source.scaleMode = 'nearest'
        const mapContext = new PIXI.GraphicsContext()
            .texture(mapTexture, 0xffffff, 0, 0)

        const background = new Graphics(mapContext)

        this.viewport.addChild(background)
        globalThis.__PIXI_APP__ = this.pixiApp;

        const playerTexture = await Assets.load(this.assetPathProvider.GetSpritePath("player.png"))
        playerTexture.source.scaleMode = 'nearest'
        

        this.playerSpriteSheet = new PIXI.Spritesheet(
            playerTexture, playerSheet
        )

        await this.playerSpriteSheet.parse()

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
            //console.log(localState)
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
        const anim = new PIXI.AnimatedSprite(this.playerSpriteSheet.animations.player)
        let a = anim as PIXI.Container
        console.log(a)
        console.log("anim cont")
        anim.pivot.set(50, 50)
        anim.animationSpeed = 0.05;
        anim.play()
        this.renderDictionary.set(id, anim)
        this.viewport.addChild(anim)
        console.log("New rect added")
    }
}