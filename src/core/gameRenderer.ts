import * as PIXI from 'pixi.js'
import { Graphics, Application, Assets, Sprite } from 'pixi.js'
import { getGameState } from './gameState'
import type { Entity } from './models/entity'
import { Viewport } from 'pixi-viewport'
import { TexturePool } from 'pixi.js'
import { GameAssetPathProvider } from './gameAssetPathProvider'
import { playerSheet } from './spritesheets/playerSheet'

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

        this.pixiApp.ticker.add(() => {
            
            const localState = getGameState()
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
                    const sprite = entity.getChildByLabel("animation") as PIXI.AnimatedSprite
                    if(item.State == "RightMovement"){
                        sprite.textures = this.playerSpriteSheet.animations.playerRightMove
                        sprite.play()
                    }
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
        const container = new PIXI.Container
        const anim = new PIXI.AnimatedSprite(this.playerSpriteSheet.animations.playerIdle)
        anim.label = "animation"
        anim.pivot.set(24, 24)
        anim.animationSpeed = 0.05;
        anim.play()
        container.addChild(anim)
        this.renderDictionary.set(id, container)
        this.viewport.addChild(container)
        console.log("New rect added")
    }
}