import * as PIXI from 'pixi.js'

export type Entity = {
    Id: string
    Position: { X: number, Y: number }
    State: string,
    Sprite: string,
    View: PIXI.Container
}