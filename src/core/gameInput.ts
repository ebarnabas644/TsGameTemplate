import { emitCustomEvent } from './utilities/customEventEmitter'

export type KeyInput = {
        input: string
        data: { [key: string]: any }
}

export class InputSystemComponent {
        private pushedButtons: KeyInput[]
        private history: KeyInput[]
        private pressHandler
        private releaseHandler
        //private mousePressHandler
        //private mouseReleaseHandler
        //private mouseMoveHandler
        private throttleCounter: number
        private throttleValue: number
        constructor() {
                this.pushedButtons = []
                this.history = []
                this.pressHandler = (event: any) => this.handleButtonPress(event)
                this.releaseHandler = (event: any) => this.handleButtonRelease(event)
                //this.mousePressHandler = (event: any) => this.handleMousePress(event)
                //this.mouseReleaseHandler = (event: any) => this.handleMouseRelease(event)
                //this.mouseMoveHandler = (event: any) => this.handleMouseMove(event)
                this.enableInput()
                this.throttleCounter = -1
                this.throttleValue = 10
        }

        public enableInput() {
                document.addEventListener('keydown', this.pressHandler)
                //document.addEventListener('mousedown', this.mousePressHandler)
                //document.addEventListener('mouseup', this.mouseReleaseHandler)
                document.addEventListener('keyup', this.releaseHandler)
        }

        public disableInput() {
                document.removeEventListener('keydown', this.pressHandler)
                //document.removeEventListener('mousedown', this.mousePressHandler)
                //document.removeEventListener('mouseup', this.mouseReleaseHandler)
                //document.removeEventListener('mousemove', this.mouseMoveHandler)
                document.removeEventListener('keyup', this.releaseHandler)
        }

        private handleButtonPress(event: any) {
                this.copyToHistory()
                if (event.key == 'ArrowLeft' || event.key == 'a') {
                        const inputEvent: KeyInput = {
                                input: 'leftMoveCommand',
                                data: {}
                        }
                        this.addInputEvent(inputEvent)
                }
                if (event.key == 'ArrowRight' || event.key == 'd') {
                        const inputEvent: KeyInput = {
                                input: 'rightMoveCommand',
                                data: {}
                        }
                        this.addInputEvent(inputEvent)
                }
                if (event.key == 'ArrowUp' || event.key == 'w') {
                        const inputEvent: KeyInput = {
                                input: 'upMoveCommand',
                                data: {}
                        }
                        this.addInputEvent(inputEvent)
                }
                if (event.key == 'ArrowDown' || event.key == 's') {
                        const inputEvent: KeyInput = {
                                input: 'downMoveCommand',
                                data: {}
                        }
                        this.addInputEvent(inputEvent)
                }

                if (!this.historylyPressedEqualsCurrentlyPressed()) {
                        emitCustomEvent('playerInput', this.pushedButtons)
                }
        }

        private handleButtonRelease(event: any) {
                if (event.key == 'ArrowLeft' || event.key == 'a') {
                        this.removeInputEvent('leftMoveCommand')
                }
                if (event.key == 'ArrowRight' || event.key == 'd') {
                        this.removeInputEvent('rightMoveCommand')
                }
                if (event.key == 'ArrowUp' || event.key == 'w') {
                        this.removeInputEvent('upMoveCommand')
                }
                if (event.key == 'ArrowDown' || event.key == 's') {
                        this.removeInputEvent('downMoveCommand')
                }
                emitCustomEvent('playerInput', this.pushedButtons)
        }

        /*private handleMousePress(event: any) {
                this.throttleCounter = -1
                const cursorPosition = new Vec2([event.clientX, event.clientY])
                const globalCursorPosition =
                        rendererSystemComponent.gameCamera.convertLocalPositionToGlobal(
                                cursorPosition
                        )
                const inputEvent: InputEvent = {
                        input: 'attack',
                        data: {
                                xPos: globalCursorPosition.x,
                                yPos: globalCursorPosition.y
                        }
                }
                this.addInputEvent(inputEvent)
                emitCustomEvent('playerInput', this.pushedButtons)
                document.addEventListener('mousemove', this.mouseMoveHandler)
        }

        private handleMouseRelease(event: any) {
                document.removeEventListener('mousemove', this.mouseMoveHandler)
                this.removeInputEvent('attack')
                emitCustomEvent('playerInput', this.pushedButtons)
        }

        private handleMouseMove(event: any) {
                this.throttleCounter++
                if (this.throttleCounter % this.throttleValue != 0) return
                const cursorPosition = new Vec2([event.clientX, event.clientY])
                const globalCursorPosition =
                        rendererSystemComponent.gameCamera.convertLocalPositionToGlobal(
                                cursorPosition
                        )
                const inputEvent: InputEvent = {
                        input: 'attack',
                        data: {
                                xPos: globalCursorPosition.x,
                                yPos: globalCursorPosition.y
                        }
                }
                this.addInputEvent(inputEvent)
                emitCustomEvent('playerInput', this.pushedButtons)
        }*/

        private historylyPressedEqualsCurrentlyPressed() {
                for (const button of this.pushedButtons) {
                        const result = this.history.find((x) => x.input == button.input)
                        if (!result) {
                                return false
                        }
                }

                return true
        }

        private addInputEvent(inputToAdd: KeyInput) {
                const result = this.pushedButtons.find((x) => x.input == inputToAdd.input)
                if (result) {
                        result.data = inputToAdd.data
                        return
                }
                this.pushedButtons.push(inputToAdd)
        }

        private removeInputEvent(input: string) {
                const result = this.pushedButtons.find((x) => x.input == input)
                if (!result) return
                const index = this.pushedButtons.indexOf(result)
                if (index == -1) return
                this.pushedButtons.splice(index, 1)
        }

        private copyToHistory() {
                this.history = []
                for (const inputEvent of this.pushedButtons) {
                        this.history.push(inputEvent)
                }
        }
}
