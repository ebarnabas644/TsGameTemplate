import * as PIXI from 'pixi.js'

export class RendererSystemComponent {
    public pixiApp: PIXI.Application<HTMLCanvasElement>

    constructor() {
        console.log("init renderer")
        this.pixiApp = new PIXI.Application<HTMLCanvasElement>({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x5c812f
        })
        const canvasLocation = document.getElementById('pixiContainer')
        if (canvasLocation) {
                canvasLocation.appendChild(this.pixiApp.view)
                console.log("Canvas location found")
        }
    }
}