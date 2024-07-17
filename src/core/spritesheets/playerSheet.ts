export const playerSheet = {
    frames: {
        playerIdle1: {
            frame: { x: 0, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerIdle2: {
            frame: { x: 48, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerIdle3: {
            frame: { x: 96, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerIdle4: {
            frame: { x: 144, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerIdle5: {
            frame: { x: 192, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerIdle6: {
            frame: { x: 240, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerRightMove1: {
            frame: { x: 0, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerRightMove2: {
            frame: { x: 48, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerRightMove3: {
            frame: { x: 96, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerRightMove4: {
            frame: { x: 144, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerRightMove5: {
            frame: { x: 192, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        },
        playerRightMove6: {
            frame: { x: 240, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
        }
    },
    meta: {
        image: 'images/spritesheet.png',
        format: 'RGBA8888',
        size: { w: 128, h: 32 },
        scale: 1
    },
    animations: {
        playerIdle: ['playerIdle1','playerIdle2','playerIdle3','playerIdle4','playerIdle5','playerIdle6'],
        playerRightMove: ['playerRightMove1','playerRightMove2','playerRightMove3','playerRightMove4','playerRightMove5','playerRightMove6'] //array of frames by name
    }
}