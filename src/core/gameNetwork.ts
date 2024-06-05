import {emitCustomEvent} from "@/core/utilities/customEventEmitter";
import * as signalR from "@microsoft/signalr"
import type { KeyInput } from "./gameInput";

export class NetworkSystemComponent{
    private connection: signalR.HubConnection

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5282/mainHub")
            .build()
    }

    public initConnection(){
        this.connection.on('connect', () => {
            console.log('Connected to the server')
            emitCustomEvent('connected', null)
        })

        this.connection.on('message', (message: string) => {
            emitCustomEvent('chatMessage', message)
            console.log("Message received: "+message)
        })

        this.connection.start().then(()=> {
            console.log('Connected to the server')
        }
        ).catch((err) => console.log('Failed to connect: '+err))

        this.connection.on('state-update', (message: string) => {
            emitCustomEvent('state-update', message)
            console.log("State update received: "+message)
        })

        this.connection.on('playerCreated', (name: string) => {
            emitCustomEvent('playerReceived', name)
            console.log(name)
        })

        this.connection.onclose(() => {
            console.log('Connection lost')
        })

        this.registerPlayerCommandEvents()
    }

    public sendMessage(event: string, message: object){
        this.connection.send(event, message).then(() => console.log('Message sent')).catch((err) => console.log('Failed to send message: '+err))
    }

    private registerPlayerCommandEvents() {
        document.addEventListener('playerInput', (event: any) => {
                const commands: KeyInput[] = []
                event.detail.forEach((command: any) => {
                        commands.push(command)
                })
                const packet = {
                    Type: "input",
                    Data: JSON.stringify(commands)
                  }
                this.sendMessage('ClientMessage', packet)
        })
}
}