import * as PIXI from 'pixi.js'
import { Graphics, Application, Assets, Sprite } from 'pixi.js'
import { getGameState } from './gameState'
import type { Entity } from './models/entity'
import { Viewport } from 'pixi-viewport'
import { TexturePool } from 'pixi.js'
import { GameAssetPathProvider } from './gameAssetPathProvider'
import { playerSheet, slimeSheet } from './spritesheets/playerSheet'
import * as vec from "@thi.ng/vectors";

export class RendererSystemComponent {
    public pixiApp: Application
    private viewport: Viewport
    public renderDictionary: Map<string, Entity>
    private spriteDictionary: Map<string, PIXI.Spritesheet>
    private followSet = false
    private playedId = ""
    private assetPathProvider: GameAssetPathProvider
    constructor() {
        console.log("init renderer")
        this.pixiApp = new Application()
        this.renderDictionary = new Map<string, Entity>
        this.spriteDictionary = new Map<string, PIXI.Spritesheet>
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

        this.initializeCanvas()
        this.loadingCamera()
        await this.loadingMap()
        this.attachPixiDebugger()

        this.pixiApp.ticker.add((context) => {
            const localState = getGameState()
            localState.forEach((item: Entity) => {
                const entity = this.renderDictionary.get(item.Id)
                if(entity !== undefined){
                    const interpolated = new vec.Vec2()
                    vec.mixN2(
                        interpolated,
                        [entity.View.x, entity.View.y],
                        [item.Position.X, item.Position.Y],
                        0.2
                    )
                    entity.View.x = interpolated.x
                    entity.View.y =  interpolated.y
                }
            })
            
        })
    }

    setFollow(id: string){
        this.playedId = id
    }

    async updateRendering(items: Entity[]){
        if(!this.followSet){
            const toFollow = this.renderDictionary.get(this.playedId)
            if(toFollow !== undefined){
                this.viewport.follow(toFollow.View as PIXI.Container)
                console.log("Follow set to:" + this.playedId)
                this.followSet = true
            }

        }
        items.forEach(async item => {
            await this.updateSpriteCache(item)
            this.updateRenderState(item)
        });

        this.removeUnusedEntites(items)
    }

    addNewEntity(id: string, entity: Entity) {
        const container = new PIXI.Container
        const anim = new PIXI.AnimatedSprite(this.spriteDictionary.get(entity.Sprite)!.animations.idle)
        anim.label = "animation"
        anim.pivot.set(24, 24)
        anim.anchor.y = 0.5
        anim.animationSpeed = 0.1;
        anim.play()
        container.addChild(anim)
        entity.View = container
        this.renderDictionary.set(id, entity)
        this.viewport.addChild(container)
    }

    updateSpriteState(entity: Entity, update: Entity){
        const sprite = entity.View.getChildByLabel("animation") as PIXI.AnimatedSprite
        if(entity.State != update.State){
            entity.State = update.State
            sprite.rotation = 0
            sprite.scale.x = 1
            if(entity.State == "RightMovement"){
                sprite.textures = this.spriteDictionary.get(entity.Sprite)!.animations.rightMove
                sprite.play()
            }
            if(entity.State == "Idle"){
                sprite.textures = this.spriteDictionary.get(entity.Sprite)!.animations.idle
                sprite.play()
            }
            if(entity.State == "LeftMovement"){
                sprite.textures = this.spriteDictionary.get(entity.Sprite)!.animations.rightMove
                sprite.scale.x = -1
                sprite.play()
            }
            if(entity.State == "UpMovement"){
                sprite.textures = this.spriteDictionary.get(entity.Sprite)!.animations.upMove
                sprite.play()
            }
            if(entity.State == "DownMovement"){
                sprite.textures = this.spriteDictionary.get(entity.Sprite)!.animations.downMove
                sprite.play()
            }
        }
    }

    initializeCanvas(){
        const canvasLocation = document.getElementById('pixiContainer')
        if (canvasLocation) {
                canvasLocation.appendChild(this.pixiApp.canvas)
        }
        else{
            console.error("Canvas not found")
        }
    }

    loadingCamera(){
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
    }

    async loadingMap(){
        const mapTexture = await Assets.load(this.assetPathProvider.GetSpritePath("zefir.png"))
        mapTexture.source.scaleMode = 'nearest'
        const mapContext = new PIXI.GraphicsContext()
            .texture(mapTexture, 0xffffff, 0, 0)

        const background = new Graphics(mapContext)

        this.viewport.addChild(background)
    }

    attachPixiDebugger(){
        globalThis.__PIXI_APP__ = this.pixiApp;
    }

    async updateSpriteCache(entity: Entity){
        if(!this.spriteDictionary.has(entity.Sprite)){
            const spriteTextureFromServer = await Assets.load(this.assetPathProvider.GetSpritePath(entity.Sprite))
            spriteTextureFromServer.source.scaleMode = 'nearest'
            let spriteSheet
            if(entity.Sprite == "slime.png"){
                spriteSheet = new PIXI.Spritesheet(spriteTextureFromServer, slimeSheet)
            }
            else{
                spriteSheet = new PIXI.Spritesheet(spriteTextureFromServer, playerSheet)
            }

            await spriteSheet.parse()
            this.spriteDictionary.set(entity.Sprite, spriteSheet)
        }
    }

    updateRenderState(item: Entity){
        if(!this.renderDictionary.has(item.Id)){
            this.addNewEntity(item.Id, item)
        }
        else{
            const entity = this.renderDictionary.get(item.Id)
            if(entity !== undefined){
                //entity.View.x = item.Position.X
                //entity.View.y = item.Position.Y
                this.updateSpriteState(entity, item)
            }
        }
    }

    removeUnusedEntites(items: Entity[]){
        this.renderDictionary.forEach((value: any, key: string) =>{
            if(items.find(x => x.Id == key) === undefined){
                const itemToRemove = this.renderDictionary.get(key)
                itemToRemove?.View?.destroy()
                this.renderDictionary.delete(key)
            }
        })
    }
}